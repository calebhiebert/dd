using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public SpellsController(Context context)
        {
            _context = context;
        }

        // GET: api/Spells
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spell>>> GetSpells()
        {
            return await _context.Spells.ToListAsync();
        }

        // GET: api/Spells/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Spell>> GetSpell(string id)
        {
            var spell = await _context.Spells.FindAsync(id);

            if (spell == null)
            {
                return NotFound();
            }

            return spell;
        }

        // PUT: api/Spells/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpell(string id, Spell spell)
        {
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
            _context.Spells.Add(spell);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpell", new { id = spell.Id }, spell);
        }

        // DELETE: api/Spells/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Spell>> DeleteSpell(string id)
        {
            var spell = await _context.Spells.FindAsync(id);
            if (spell == null)
            {
                return NotFound();
            }

            _context.Spells.Remove(spell);
            await _context.SaveChangesAsync();

            return spell;
        }

        private bool SpellExists(string id)
        {
            return _context.Spells.Any(e => e.Id == id);
        }
    }
}
