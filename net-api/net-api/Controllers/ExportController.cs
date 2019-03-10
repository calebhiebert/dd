using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;
using Newtonsoft.Json;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportController : ControllerBase
    {
        private readonly IAuthorizationService _auth;
        private readonly Context _context;

        public ExportController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        [HttpGet]
        public async Task<IActionResult> ExportCampaign(
            [FromQuery] Guid? campaignId,
            [FromQuery] bool items,
            [FromQuery] bool spells,
            [FromQuery] bool quests,
            [FromQuery] bool articles,
            [FromQuery] bool entitypresets,
            [FromQuery] Guid[] conceptType
            )
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            // Zip creation code
            var zipMemStream = new MemoryStream();

            using (var zipArchive = new ZipArchive(zipMemStream, ZipArchiveMode.Create, true))
            {
                var serializer = new JsonSerializer();

                // Write items
                if (items)
                {
                    var entry = zipArchive.CreateEntry("items.json");
                    using (var strm = entry.Open())
                    {
                        var itemList = await _context.Items
                            .Where(i => i.CampaignId == campaignId)
                            .Select(i => new { i.Id, i.Name, i.Content, i.Cost, i.ImageId, i.Tags, i.Weight, i.PlayerVisible })
                            .ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, itemList);
                        await jtw.FlushAsync();
                    }
                }

                // Write spells
                if (spells)
                {
                    var entry = zipArchive.CreateEntry("spells.json");

                    using (var strm = entry.Open())
                    {
                        var spellList = await _context.Spells
                            .Where(s => s.CampaignId == campaignId)
                            .Select(s => new { s.Id, s.Name, s.Content, s.PlayerVisible, s.Tags, s.ImageId })
                            .ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, spellList);
                        await jtw.FlushAsync();
                    }
                }

                // Write entity presets
                if (entitypresets)
                {
                    var entry = zipArchive.CreateEntry("entity-presets.json");

                    using (var strm = entry.Open())
                    {
                        var entityPresetList = await _context.EntityPresets
                            .Where(ep => ep.CampaignId == campaignId)
                            .Select(ep => new
                            {
                                ep.Id,
                                ep.Name,
                                ep.ImageId,
                                ep.Attributes,
                                ep.Description,
                                ep.Health,
                                ep.IsCurrencyEnabled,
                                ep.IsHealthEnabled,
                                ep.IsInventoryEnabled,
                                ep.IsSpellsetsEnabled,
                                ep.IsXPEnabled,
                                ep.PlayerCreatable
                            })
                            .ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, entityPresetList);
                        await jtw.FlushAsync();
                    }
                }

                // Write articles
                if (articles)
                {
                    var entry = zipArchive.CreateEntry("articles.json");

                    using (var strm = entry.Open())
                    {
                        var articleList = await _context.Articles
                            .Where(a => a.CampaignId == campaignId)
                            .Select(a => new
                            {
                                a.Content,
                                a.Icon,
                                a.Name,
                                a.Published,
                                a.Tags,
                                a.Id
                            }).ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, articleList);
                        await jtw.FlushAsync();
                    }
                }

                // Write quests
                if (quests)
                {
                    var entry = zipArchive.CreateEntry("quests.json");

                    using (var strm = entry.Open())
                    {
                        var questList = await _context.Quests
                            .Where(q => q.CampaignId == campaignId)
                            .Select(q => new
                            {
                                q.Accepted,
                                q.Available,
                                q.Content,
                                q.Id,
                                q.Name,
                                q.OriginId,
                                q.Status,
                                q.Visible
                            }).ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, questList);
                        await jtw.FlushAsync();
                    }
                }

                // Write concept types
                if (conceptType != null && conceptType.Length > 0)
                {
                    var entry = zipArchive.CreateEntry("concept-types.json");

                    using (var strm = entry.Open())
                    {
                        var conceptTypes = await _context.ConceptTypes
                            .Where(ct => ct.CampaignId == campaignId)
                            .Where(ct => conceptType.Contains(ct.Id))
                            .Select(q => new
                            {
                                q.Id,
                                q.Name,
                                q.PluralForm,
                                q.Description,
                                q.Icon,
                                q.Fields,
                                q.EntityConfig
                            }).ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, conceptTypes);
                        await jtw.FlushAsync();
                    }
                }

                // Write concepts
                if (conceptType != null && conceptType.Length > 0)
                {
                    var entry = zipArchive.CreateEntry("concepts.json");

                    using (var strm = entry.Open())
                    {
                        var concepts = await _context.Concepts
                            .Where(ct => conceptType.Contains(ct.ConceptTypeId))
                            .Select(q => new
                            {
                                q.Id,
                                q.Name,
                                q.Content,
                                q.ImageId,
                                q.Fields,
                                q.Tags,
                                q.ConceptTypeId
                            }).ToListAsync();

                        var jtw = new JsonTextWriter(new StreamWriter(strm));
                        serializer.Serialize(jtw, concepts);
                        await jtw.FlushAsync();
                    }
                }
            }

            zipMemStream.Seek(0, SeekOrigin.Begin);

            Response.Headers.Append("content-disposition", $"attachment; filename=\"{campaign.Name}.zip\"");

            return File(zipMemStream, "application/zip");
        }
    }
}