using System;
using System.Collections.Generic;
using System.Linq;
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
    public class SpellsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public SpellsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/Spells
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spell>>> GetSpells(
            [FromQuery] Guid? campaignId,
            [FromQuery] int limit,
            [FromQuery] int offset,
            [FromQuery] string search
            )
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var campaign = _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefault();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (limit == 0)
            {
                limit = 50;
            } else if (limit > 50)
            {
                limit = 50;
            }

            IQueryable<Spell> spells;

            spells = _context.Spells
                .Where(s => s.CampaignId == campaign.Id)
                .OrderBy(s => s.Name);

            // Only let the campaign owner see spells with playerVisible = false
            if (!campaignEditableAuthResult.Succeeded)
            {
                spells = spells
                    .Where(s => s.PlayerVisible == true);
            }

            if (search != null)
            {
                search = search.ToLower().Trim();

                spells = spells
                    .Where(s =>
                    s.Name.ToLower().Contains(search) ||
                    s.Description.ToLower().Contains(search) ||
                    string.Join(",", s.Tags).ToLower().Contains(search)
                    );
            }

            var count = spells.Count();

            if (limit > 0 || offset > 0)
            {
                spells = spells
                    .Skip(offset)
                    .Take(limit);
            }

            return Ok(new
            {
                Spells = spells.ToArray(),
                Total = count,
            });
        }

        // GET: api/Spells/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Spell>> GetSpell(Guid id)
        {
            var spell = await _context.Spells
                .Include(s => s.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (spell == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, spell.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return spell;
        }

        // PUT: api/Spells/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpell(Guid id, Spell spell)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == spell.CampaignId)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            if (id != spell.Id)
            {
                return BadRequest();
            }

            _context.Entry(spell).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpellExists(id))
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

        // POST: api/Spells
        [HttpPost]
        public async Task<ActionResult<Spell>> PostSpell(Spell spell)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == spell.CampaignId)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Spells.Add(spell);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpell", new { id = spell.Id }, spell);
        }

        // DELETE: api/Spells/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Spell>> DeleteSpell(Guid id)
        {
            var spell = await _context.Spells
                .Include(s => s.Campaign)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (spell == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, spell.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Spells.Remove(spell);
            await _context.SaveChangesAsync();

            return spell;
        }

        private bool SpellExists(Guid id)
        {
            return _context.Spells.Any(e => e.Id == id);
        }
    }
}
