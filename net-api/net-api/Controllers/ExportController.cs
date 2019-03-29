﻿using System;
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
                                ep.Fields,
                                ep.Description,
                                ep.Health,
                                ep.IsCurrencyEnabled,
                                ep.IsHealthEnabled,
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
                            .Select(ct => new
                            {
                                ct.Id,
                                ct.Name,
                                ct.PluralForm,
                                ct.Description,
                                ct.Icon,
                                ct.Fields,
                                ct.EntityConfig,
                                ct.IsLinkableToArticles,
                                ct.IsShownInNavigationMenu,
                                ct.IsUsableInOverviewScreen,
                                ct.PlayerEditable,
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
                            .Select(c => new
                            {
                                c.Id,
                                c.Name,
                                c.Content,
                                c.ImageId,
                                c.Fields,
                                c.Tags,
                                c.ConceptTypeId,
                                c.IsContainer
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