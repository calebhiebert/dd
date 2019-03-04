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
            int itemsImported = 0;
            int spellsImported = 0;
            int articlesImported = 0;
            int questsImported = 0;
            int entityPresetsImported = 0;

            using (var fileStream = file.OpenReadStream())
            {
                var zip = new ZipArchive(fileStream, ZipArchiveMode.Read);

                foreach (var entry in zip.Entries)
                {
                    switch(entry.Name)
                    {
                        case "items.json":
                            var items = DeserializeZipStream<Item[]>(entry.Open());
                            foreach (var item in items)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(item.Id, newId);
                                item.Id = newId;
                                item.CampaignId = (Guid)campaignId;
                                item.UserId = userId;
                                _context.Items.Add(item);
                                itemsImported++;
                            }
                            break;

                        case "spells.json":
                            var spells = DeserializeZipStream<Spell[]>(entry.Open());
                            foreach (var spell in spells)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(spell.Id, newId);
                                spell.Id = newId;
                                spell.CampaignId = (Guid)campaignId;
                                spell.UserId = userId;
                                _context.Spells.Add(spell);
                                spellsImported++;
                            }
                            break;

                        case "articles.json":
                            var articles = DeserializeZipStream<Article[]>(entry.Open());
                            foreach (var article in articles)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(article.Id, newId);
                                article.Id = newId;
                                article.CampaignId = (Guid)campaignId;
                                article.UserId = userId;
                                _context.Articles.Add(article);
                                articlesImported++;
                            }
                            break;

                        case "quests.json":
                            var quests = DeserializeZipStream<Quest[]>(entry.Open());
                            foreach (var quest in quests)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(quest.Id, newId);
                                quest.Id = newId;
                                quest.CampaignId = (Guid)campaignId;
                                _context.Quests.Add(quest);
                                questsImported++;
                            }
                            break;

                        case "entity-presets.json":
                            var entityPresets = DeserializeZipStream<EntityPreset[]>(entry.Open());
                            foreach (var ep in entityPresets)
                            {
                                var newId = Guid.NewGuid();

                                idDict.Add(ep.Id, newId);
                                ep.Id = newId;
                                ep.CampaignId = (Guid)campaignId;
                                ep.UserId = userId;
                                _context.EntityPresets.Add(ep);
                                entityPresetsImported++;
                            }
                            break;
                    }
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { Items = itemsImported, Quests = questsImported, Articles = articlesImported, Spells = spellsImported, EntityPresets = entityPresetsImported });
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
    }
}