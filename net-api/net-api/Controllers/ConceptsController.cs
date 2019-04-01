﻿ using System;
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
            [FromQuery] string search,
            [FromQuery] Guid[] only,
            [FromQuery] Guid[] except
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

            if (only != null && only.Length > 0)
            {
                conceptQuery = conceptQuery
                    .Where(c => only.Contains(c.Id));
            }

            if (except != null && except.Length > 0)
            {
                conceptQuery = conceptQuery
                    .Where(c => !except.Contains(c.Id));
            }

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

            _context.AssetViews.Add(new AssetView(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, concept.ConceptType.CampaignId)
            {
                ConceptId = concept.Id,
            });
            await _context.SaveChangesAsync();

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

            return Ok(concept.History.OrderBy(h => h.DateTime));
        }

        [HttpPost("{conceptId}/restore/{historyId}")]
        public async Task<IActionResult> Restore(Guid conceptId, Guid historyId)
        {
            var concept = await _context.Concepts
                .Where(c => c.Id == conceptId)
                    .Include(c => c.ConceptType)
                        .ThenInclude(ct => ct.Campaign)
                .FirstOrDefaultAsync();

            if (concept == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, concept.ConceptType.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var history = await _context.ConceptHistories
                .Where(h => h.Id == historyId)
                .FirstOrDefaultAsync();

            if (history == null)
            {
                return NotFound();
            }

            if (history.ConceptId != concept.Id)
            {
                return BadRequest("mismatched history and concept ids");
            }

            // Copy restore values over
            concept.Name = history.Name;
            concept.ContentJson = history.ContentJson;
            concept.ImageId = history.ImageId;
            concept.FieldsJson = history.FieldsJson;
            concept.Tags = history.Tags;
            concept.ConceptTypeId = history.ConceptTypeId;

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            _context.ConceptHistories.Add(new ConceptHistory(concept)
            {
                UserId = userId,
                ActionType = ActionType.Restore,
                ActionSource = ActionSource.User,
            });

            _context.Entry(concept).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(concept);
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

            concept.UserId = existingConcept.UserId;
            concept.ConceptType = null;
            concept.History = null;
            concept.User = null;

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
            concept.ConceptType = null;
            concept.History = null;
            concept.User = null;
            concept.Id = Guid.NewGuid();

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
