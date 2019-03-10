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
    [Authorize]
    public class SpellsetController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public SpellsetController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/Spellset/lskdjfosiejfse
        [HttpGet("{entityId}")]
        public async Task<ActionResult> GetEntitySpells([FromRoute] Guid? entityId)
        {
            if (entityId == null)
            {
                return BadRequest("missing entity id");
            }

            var entity = await _context.Entities
                .Where(e => e.Id == entityId)
                .Include(e => e.Campaign)
                    .ThenInclude(c => c.Members)
                .Include(e => e.EntitySpells)
                    .ThenInclude(es => es.Spell)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, entity.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(entity.EntitySpells);
        }

        // PUT: api/Spellset
        [HttpPut]
        public async Task<IActionResult> PutEntitySpell(EntitySpell entitySpell)
        {
            var entity = await _context.Entities
                .Where(e => e.Id == entitySpell.EntityId)
                .Include(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entity, "EntityEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
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
                .Include(es => es.Entity)
                    .ThenInclude(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (entitySpell == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entitySpell.Entity.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
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
