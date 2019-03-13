using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_api.Models;
using Newtonsoft.Json;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImportController : ControllerBase
    {
        private readonly IAuthorizationService _auth;
        private readonly Context _context;

        public ImportController(IAuthorizationService auth, Context context)
        {
            _auth = auth;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> ImportData([FromForm]IFormFile file, [FromForm]Guid? campaignId)
        {
            // Old imported ids need to be remapped to new ids
            var idDict = new Dictionary<Guid, Guid>();
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int articlesImported = 0;
            int questsImported = 0;
            int entityPresetsImported = 0;
            int conceptTypesImported = 0;
            int conceptsImported = 0;

            var articleList = new List<Article>();
            var questList = new List<Quest>();
            var entityPresetList = new List<EntityPreset>();
            var conceptTypeList = new List<ConceptType>();
            var conceptList = new List<Concept>();

            using (var fileStream = file.OpenReadStream())
            {
                var zip = new ZipArchive(fileStream, ZipArchiveMode.Read);

                foreach (var entry in zip.Entries)
                {
                    switch(entry.Name)
                    {
                        case "articles.json":
                            articleList = DeserializeZipStream<List<Article>>(entry.Open());
                            foreach (var article in articleList)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(article.Id, newId);
                                article.Id = newId;
                                article.CampaignId = (Guid)campaignId;
                                article.UserId = userId;
                                articlesImported++;
                            }
                            break;

                        case "quests.json":
                            questList = DeserializeZipStream<List<Quest>>(entry.Open());
                            foreach (var quest in questList)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(quest.Id, newId);
                                quest.Id = newId;
                                quest.CampaignId = (Guid)campaignId;
                                questsImported++;
                            }
                            break;
                        case "concept-types.json":
                            conceptTypeList = DeserializeZipStream<List<ConceptType>>(entry.Open());

                            foreach (var conceptType in conceptTypeList)
                            {
                                var newId = Guid.NewGuid();
                                idDict.Add(conceptType.Id, newId);
                                conceptType.Id = newId;
                                conceptType.CampaignId = (Guid)campaignId;
                                conceptType.UserId = userId;
                                
                                if (conceptType.EntityConfig == null)
                                {
                                    conceptType.EntityConfig = new ConceptEntityConfig
                                    {
                                        Enabled = false,
                                    };
                                }

                                conceptTypesImported++;
                            }
                            break;
                        case "concepts.json":
                            conceptList = DeserializeZipStream<List<Concept>>(entry.Open());

                            foreach (var concept in conceptList)
                            {
                                var newId = Guid.NewGuid();
                                idDict.Add(concept.Id, newId);
                                concept.Id = newId;
                                concept.UserId = userId;
                                conceptsImported++;
                            }
                            break;
                        case "entity-presets.json":
                            entityPresetList = DeserializeZipStream<List<EntityPreset>>(entry.Open());
                            foreach (var ep in entityPresetList)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(ep.Id, newId);
                                ep.Id = newId;
                                ep.CampaignId = (Guid)campaignId;
                                ep.UserId = userId;
                               
                                if (ep.ConceptTypesEnabled == null)
                                {
                                    ep.ConceptTypesEnabled = new Guid[0];
                                }

                                entityPresetsImported++;
                            }
                            break;
                    }
                }
            }

            // Reassign values
            foreach (var concept in conceptList)
            {
                concept.ConceptTypeId = idDict[concept.ConceptTypeId];

                _context.ConceptHistories.Add(new ConceptHistory(concept)
                {
                    UserId = userId,
                    ActionType = ActionType.Create,
                    ActionSource = ActionSource.Import,
                });
            }

            // Update all id values in all content to new id values
            foreach (var obj in articleList)
            {
                obj.ContentJson = PatchIdValues(obj.ContentJson, idDict);
            }

            foreach (var obj in questList)
            {
                obj.ContentJson = PatchIdValues(obj.ContentJson, idDict);
            }

            foreach (var obj in conceptList)
            {
                obj.ContentJson = PatchIdValues(obj.ContentJson, idDict);
                obj.FieldsJson = PatchIdValues(obj.FieldsJson, idDict);
            }

            // Add all entries to the context
            _context.AddRange(articleList);
            _context.AddRange(questList);
            _context.AddRange(entityPresetList);
            _context.AddRange(conceptTypeList);
            _context.AddRange(conceptList);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Quests = questsImported,
                Articles = articlesImported,
                EntityPresets = entityPresetsImported,
                Concepts = conceptsImported,
                ConceptTypes = conceptTypesImported
            });
        }

        private T DeserializeZipStream<T>(Stream inStream)
        {
            using (var s = inStream)
            using (var sr = new StreamReader(s))
            using (var jr = new JsonTextReader(sr))
            {
                var serializer = new JsonSerializer();

                return serializer.Deserialize<T>(jr);
            }
        }

        private string PatchIdValues(string old, Dictionary<Guid, Guid> idDict)
        {
            string replaced = old;

            foreach(var entry in idDict)
            {
                var oldId = entry.Key.ToString();
                var newId = entry.Value.ToString();

                replaced = replaced.Replace(oldId, newId);
            }

            return replaced;
        }
    }
}