﻿using System;
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
    public class ConceptsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public ConceptsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/Concepts
        [HttpGet]
        public async Task<IActionResult> GetConcepts(
            [FromQuery] Guid type,
            [FromQuery] int limit,
            [FromQuery] int offset,
            [FromQuery] string search
            )
        {
            var conceptType = await _context.ConceptTypes
                .Where(ct => ct.Id == type)
                .Include(ct => ct.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (conceptType == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, conceptType.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var conceptQuery = _context.Concepts
                .Where(c => c.ConceptTypeId == type);

            if (search != null)
            {
                search = search.ToLower();

                conceptQuery = conceptQuery
                    .Where(cq => cq.Name.ToLower().Contains(search));
            }

            if (limit <= 0)
            {
                limit = 10;
            } else if (limit > 50)
            {
                limit = 50;
            }

            if (offset < 0)
            {
                offset = 0;
            }

            var totalCount = await conceptQuery.CountAsync();

            conceptQuery = conceptQuery.Skip(offset).Take(limit);

            var concepts = await conceptQuery.ToListAsync();

            return Ok(new { Concepts = concepts, Total = totalCount });
        }

        // GET: api/Concepts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Concept>> GetConcept(Guid id)
        {
            var concept = await _context.Concepts
                .Where(c => c.Id == id)
                .Include(c => c.ConceptType)
                    .ThenInclude(ct => ct.Campaign)
                        .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (concept == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, concept.ConceptType.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return concept;
        }

        // PUT: api/Concepts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConcept(Guid id, Concept concept)
        {
            if (id != concept.Id)
            {
                return BadRequest();
            }

            _context.Entry(concept).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConceptExists(id))
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

        // POST: api/Concepts
        [HttpPost]
        public async Task<ActionResult<Concept>> PostConcept(Concept concept)
        {
            _context.Concepts.Add(concept);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConcept", new { id = concept.Id }, concept);
        }

        // DELETE: api/Concepts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Concept>> DeleteConcept(Guid id)
        {
            var concept = await _context.Concepts.FindAsync(id);
            if (concept == null)
            {
                return NotFound();
            }

            _context.Concepts.Remove(concept);
            await _context.SaveChangesAsync();

            return concept;
        }

        private bool ConceptExists(Guid id)
        {
            return _context.Concepts.Any(e => e.Id == id);
        }
    }
}
