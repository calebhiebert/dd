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

            conceptQuery = conceptQuery.OrderBy(cq => cq.Name).Skip(offset).Take(limit);

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

        // GET: api/Concepts/5
        [HttpGet("{id}/history")]
        public async Task<IActionResult> GetConceptHistory(Guid id)
        {
            var concept = await _context.Concepts
                .Where(c => c.Id == id)
                .Include(c => c.ConceptType)
                    .ThenInclude(ct => ct.Campaign)
                        .ThenInclude(c => c.Members)
                .Include(c => c.History)
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

            return Ok(concept.History);
        }

        // PUT: api/Concepts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConcept(Guid id, Concept concept)
        {
            if (id != concept.Id)
            {
                return BadRequest();
            }

            var existingConcept = await _context.Concepts
                .Where(c => c.Id == id)
                .AsNoTracking()
                .Include(c => c.ConceptType)
                    .ThenInclude(c => c.Campaign)
                        .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (existingConcept == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, existingConcept.ConceptType, "ConceptEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            concept.ConceptType = null;
            concept.UserId = existingConcept.UserId;

            _context.Entry(concept).State = EntityState.Modified;

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _context.ConceptHistories.Add(new ConceptHistory(concept)
            {
                UserId = userId,
                ActionType = ActionType.Update,
                ActionSource = ActionSource.User,
            });

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
            var existingConceptType = await _context.ConceptTypes
                .Where(c => c.Id == concept.ConceptTypeId)
                .AsNoTracking()
                .Include(c => c.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (existingConceptType == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, existingConceptType, "ConceptEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            concept.UserId = userId;

            _context.Concepts.Add(concept);

            _context.ConceptHistories.Add(new ConceptHistory(concept)
            {
                UserId = userId,
                ActionType = ActionType.Create,
                ActionSource = ActionSource.User,
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConcept", new { id = concept.Id }, concept);
        }

        // DELETE: api/Concepts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Concept>> DeleteConcept(Guid id)
        {
            var concept = await _context.Concepts
                .Where(c => c.Id == id)
                    .Include(c => c.ConceptType)
                        .ThenInclude(c => c.Campaign)
                            .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (concept == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, concept.ConceptType, "ConceptEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.Concepts.Remove(concept);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _context.ConceptHistories.Add(new ConceptHistory(concept)
            {
                UserId = userId,
                ActionType = ActionType.Delete,
                ActionSource = ActionSource.User,
            });

            await _context.SaveChangesAsync();

            return concept;
        }

        private bool ConceptExists(Guid id)
        {
            return _context.Concepts.Any(e => e.Id == id);
        }
    }
}
