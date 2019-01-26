using System;
using System.Collections.Generic;
using System.Linq;
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
    public class EntityPresetsController : ControllerBase
    {
        private readonly Context _context;

        public EntityPresetsController(Context context)
        {
            _context = context;
        }

        // GET: api/EntityPresets
        [HttpGet]
        public async Task<IActionResult> GetEntityPresets([FromQuery(Name = "campaignId")] string campaignId)
        {
            if (campaignId == null)
            {
                return BadRequest("Missing campaign id");
            }

            // TODO authenticate requests

            var presets = await _context.EntityPresets
                .Where(e => e.CampaignId == campaignId)
                .ToListAsync();

            return Ok(presets);
        }

        // GET: api/EntityPresets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntityPreset([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            var entityPreset = await _context.EntityPresets.FindAsync(id);

            if (entityPreset == null)
            {
                return NotFound();
            }

            return Ok(entityPreset);
        }

        // PUT: api/EntityPresets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntityPreset([FromRoute] string id, [FromBody] EntityPreset entityPreset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entityPreset.Id)
            {
                return BadRequest();
            }

            // TODO authenticate requests

            _context.Entry(entityPreset).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityPresetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EntityPresets
        [HttpPost]
        public async Task<IActionResult> PostEntityPreset([FromBody] EntityPreset entityPreset)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            entityPreset.Id = Nanoid.Nanoid.Generate();

            _context.EntityPresets.Add(entityPreset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntityPreset", new { id = entityPreset.Id }, entityPreset);
        }

        // DELETE: api/EntityPresets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntityPreset([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // TODO authenticate requests

            var entityPreset = await _context.EntityPresets.FindAsync(id);
            if (entityPreset == null)
            {
                return NotFound();
            }

            _context.EntityPresets.Remove(entityPreset);
            await _context.SaveChangesAsync();

            return Ok(entityPreset);
        }

        private bool EntityPresetExists(string id)
        {
            return _context.EntityPresets.Any(e => e.Id == id);
        }
    }
}