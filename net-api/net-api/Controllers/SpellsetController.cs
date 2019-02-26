 using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpellsetController : ControllerBase
    {
        private readonly Context _context;

        public SpellsetController(Context context)
        {
            _context = context;
        }

        // GET: api/Spellset/lskdjfosiejfse
        [HttpGet("{entityId}")]
        public async Task<ActionResult<IEnumerable<EntitySpell>>> GetEntitySpells([FromRoute] Guid? entityId)
        {
            if (entityId == null)
            {
                return BadRequest("missing entity id");
            }

            return await _context.EntitySpells
                .Where(es => es.EntityId == entityId)
                .Include(es => es.Spell)
                .ToListAsync();
        }

        // PUT: api/Spellset
        [HttpPut]
        public async Task<IActionResult> PutEntitySpell(EntitySpell entitySpell)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var entity = await _context.Entities
                .Where(e => e.Id == entitySpell.EntityId)
                .Include(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            // Check for correct permissions
            if (userId != entity.UserId && userId != entity.Campaign.UserId)
            {
                return BadRequest("no permissions");
            }

            // It's possible that the client could submit the spell field
            // this is not ideal (because entity framework will track it), so we just clear it
            entitySpell.Spell = null;

            if (!EntitySpellExists(entitySpell.EntityId, entitySpell.SpellId))
            {
                _context.EntitySpells.Add(entitySpell);
            } else
            {
                _context.Entry(entitySpell).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntitySpellExists(entitySpell.EntityId, entitySpell.SpellId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _context.Entry(entitySpell)
                .Reference(es => es.Spell)
                .LoadAsync();

            return Ok(entitySpell);
        }

        // DELETE: api/Spellset/5
        [HttpDelete("{entityId}/spell/{spellId}")]
        public async Task<ActionResult<EntitySpell>> DeleteEntitySpell(Guid entityId, Guid spellId)
        {
            var entitySpell = await _context.EntitySpells
                .Where(es => es.SpellId == spellId && es.EntityId == entityId)
                .FirstOrDefaultAsync();
            if (entitySpell == null)
            {
                return NotFound();
            }

            _context.EntitySpells.Remove(entitySpell);
            await _context.SaveChangesAsync();

            return entitySpell;
        }

        private bool EntitySpellExists(Guid entityId, Guid spellId)
        {
            return _context.EntitySpells.Any(e => e.EntityId == entityId && e.SpellId == spellId);
        }
    }
}
