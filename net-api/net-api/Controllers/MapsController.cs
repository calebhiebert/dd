﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MapsController : ControllerBase
    {
        private readonly Context _context;

        public MapsController(Context context)
        {
            _context = context;
        }

        // GET: api/Maps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Map>>> GetMaps()
        {
            return await _context.Maps.ToListAsync();
        }

        // GET: api/Maps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Map>> GetMap(Guid id)
        {
            var map = await _context.Maps.FindAsync(id);

            if (map == null)
            {
                return NotFound();
            }

            return map;
        }

        // POST: api/Maps
        [HttpPost]
        public async Task<IActionResult> PostMap([FromForm]IFormFile file, [FromForm]Guid? campaignId)
        {
            if (file == null)
            {
                return BadRequest("missing file");
            }

            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var client = new HttpClient();
            var content = new MultipartFormDataContent();
            content.Add(new StreamContent(file.OpenReadStream()), "file", "mapfile");

            var result = await client.PostAsync("http://127.0.0.1:8081/upload", content);
            if (result.IsSuccessStatusCode)
            {
                var resultValue = await result.Content.ReadAsAsync<Map>();
                resultValue.UserId = userId;
                resultValue.CampaignId = (Guid)campaignId;

                _context.Maps.Add(resultValue);
                await _context.SaveChangesAsync();

                // Clear mapping value before it's sent to the client
                resultValue.Mapping = null;

                return Ok(resultValue);
            } else
            {
                return BadRequest(result);
            }
        }

        // DELETE: api/Maps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Map>> DeleteMap(Guid id)
        {
            var map = await _context.Maps.FindAsync(id);
            if (map == null)
            {
                return NotFound();
            }

            _context.Maps.Remove(map);
            await _context.SaveChangesAsync();

            return map;
        }

        private bool MapExists(Guid id)
        {
            return _context.Maps.Any(e => e.Id == id);
        }
    }
}
