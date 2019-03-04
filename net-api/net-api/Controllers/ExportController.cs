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
        public async Task<IActionResult> ExportCampaign([FromQuery] Guid? campaignId)
        {
            var items = _context.Items
                .Where(i => i.CampaignId == campaignId)
                .Select(i => new { i.Id, i.Name, i.Content, i.Cost, i.ImageId, i.Tags, i.Weight, i.PlayerVisible })
                .ToList();

            var spells = _context.Spells
                .Where(s => s.CampaignId == campaignId)
                .Select(s => new { s.Id, s.Name, s.Content, s.PlayerVisible, s.Tags, s.ImageId })
                .ToList();

            var entityPresets = _context.EntityPresets
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
                .ToList();

            var articles = _context.Articles
                .Where(a => a.CampaignId == campaignId)
                .Select(a => new
                {
                    a.Content,
                    a.Icon,
                    a.Name,
                    a.Published,
                    a.Tags
                });

            var quests = _context.Quests
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
                });

            // Zip creation code
            var zipMemStream = new MemoryStream();

            using (var zipArchive = new ZipArchive(zipMemStream, ZipArchiveMode.Create, true))
            {
                var serializer = new JsonSerializer();

                // Write items
                var entry = zipArchive.CreateEntry("items.json");

                using (var strm = entry.Open())
                {
                    var jtw = new JsonTextWriter(new StreamWriter(strm));
                    serializer.Serialize(jtw, items);
                    jtw.Flush();
                }

                // Write spells
                entry = zipArchive.CreateEntry("spells.json");

                using (var strm = entry.Open())
                {
                    var jtw = new JsonTextWriter(new StreamWriter(strm));
                    serializer.Serialize(jtw, spells);
                    jtw.Flush();
                }

                // Write entity presets
                entry = zipArchive.CreateEntry("entity-presets.json");

                using (var strm = entry.Open())
                {
                    var jtw = new JsonTextWriter(new StreamWriter(strm));
                    serializer.Serialize(jtw, entityPresets);
                    jtw.Flush();
                }

                // Write articles
                entry = zipArchive.CreateEntry("articles.json");

                using (var strm = entry.Open())
                {
                    var jtw = new JsonTextWriter(new StreamWriter(strm));
                    serializer.Serialize(jtw, articles);
                    jtw.Flush();
                }

                // Write quests
                entry = zipArchive.CreateEntry("quests.json");

                using (var strm = entry.Open())
                {
                    var jtw = new JsonTextWriter(new StreamWriter(strm));
                    serializer.Serialize(jtw, quests);
                    jtw.Flush();
                }
            }

            zipMemStream.Seek(0, SeekOrigin.Begin);

            Response.Headers.Append("content-disposition", "attachment; filename=\"Export.zip\"");

            return File(zipMemStream, "application/zip");
        }
    }
}