﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ConceptEntitiesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;
        private readonly IHubContext<UpdateHub> _hub;

        public ConceptEntitiesController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/ConceptEntities
        [HttpGet]
        public async Task<IActionResult> GetConceptEntities([FromQuery]Guid entityId, [FromQuery]Guid conceptTypeId)
        {
            var entity = await _context.Entities
                .Where(e => e.Id == entityId)
                .Include(e => e.EntityConcepts)
                    .ThenInclude(ec => ec.Concept)
                .Include(e => e.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entity.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(entity.EntityConcepts
                .Where(ec => ec.Concept.ConceptTypeId == conceptTypeId)
                .OrderBy(ec => ec.SortValue));
        }

        // PUT: api/ConceptEntities
        [HttpPut]
        public async Task<IActionResult> PutConceptEntity(ConceptEntity conceptEntity)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var entity = await _context.Entities
                .Where(e => e.Id == conceptEntity.EntityId)
                .Include(e => e.Campaign)
                .Include(e => e.EntityConcepts)
                .AsNoTracking()
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

            // It's possible that the client could submit the concept field
            // this is not ideal (because entity framework will track it), so we just clear it
            conceptEntity.Concept = null;

            if (!ConceptEntityExists(conceptEntity.EntityId, conceptEntity.ConceptId))
            {
                _context.ConceptEntities.Add(conceptEntity);
                conceptEntity.SortValue = entity.EntityConcepts.Count;
            }
            else
            {
                _context.Entry(conceptEntity).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConceptEntityExists(conceptEntity.EntityId, conceptEntity.ConceptId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Because the concept field was cleared above, but we want to send it in the response
            // we need to re populate it
            await _context.Entry(conceptEntity)
                .Reference(i => i.Concept)
                .LoadAsync();

            await _hub.Clients
                .Group($"entity-{conceptEntity.EntityId}")
                .SendAsync("ConceptEntityUpdate", conceptEntity);

            return Ok(conceptEntity);
        }

        // PUT: api/ConceptEntities
        [HttpPut("multi")]
        public async Task<IActionResult> PutConceptEntities(ConceptEntityMulti conceptEntities)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var entity = await _context.Entities
                .Where(e => e.Id == conceptEntities.EntityId)
                .Include(e => e.Campaign)
                .Include(e => e.EntityConcepts)
                .AsNoTracking()
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

            foreach (var conceptEntity in conceptEntities.ConceptEntities)
            {
                // It's possible that the client could submit the concept field
                // this is not ideal (because entity framework will track it), so we just clear it
                conceptEntity.Concept = null;

                if (!ConceptEntityExists(conceptEntity.EntityId, conceptEntity.ConceptId))
                {
                    _context.ConceptEntities.Add(conceptEntity);
                    conceptEntity.SortValue = entity.EntityConcepts.Count;
                }
                else
                {
                    _context.Entry(conceptEntity).State = EntityState.Modified;
                }

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ConceptEntityExists(conceptEntity.EntityId, conceptEntity.ConceptId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                // Because the concept field was cleared above, but we want to send it in the response
                // we need to re populate it
                await _context.Entry(conceptEntity)
                    .Reference(i => i.Concept)
                    .LoadAsync();

                await _hub.Clients
                    .Group($"entity-{conceptEntity.EntityId}")
                    .SendAsync("ConceptEntityUpdate", conceptEntity);
            }

            return NoContent();
        }

        // DELETE: api/ConceptEntities/5
        [HttpDelete("{entId}/Concept/{cId}")]
        public async Task<ActionResult<ConceptEntity>> DeleteConceptEntity([FromRoute] Guid entId, [FromRoute] Guid cId)
        {
            var conceptEntity = await _context.ConceptEntities
                .Where(ce => ce.EntityId == entId && ce.ConceptId == cId)
                .Include(ii => ii.Entity)
                    .ThenInclude(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (conceptEntity == null)
            {
                return NotFound();
            }

            var authResult = _auth.AuthorizeAsync(User, conceptEntity.Entity, "EntityEditPolicy");

            _context.ConceptEntities.Remove(conceptEntity);
            await _context.SaveChangesAsync();

            await _hub.Clients
                .Group($"entity-{conceptEntity.EntityId}")
                .SendAsync("ConceptEntityDelete", conceptEntity);

            return conceptEntity;
        }

        private bool ConceptEntityExists(Guid entityId, Guid conceptId)
        {
            return _context.ConceptEntities.Any(ce => ce.EntityId == entityId && ce.ConceptId == conceptId);
        }
    }

    public class ConceptEntityMulti
    {
        public ConceptEntity[] ConceptEntities { get; set; }
        public Guid EntityId { get; set; }
    }
}
