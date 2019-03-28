using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleConceptsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;
        private readonly IHubContext<UpdateHub> _hub;

        public ArticleConceptsController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/ArticleConcepts
        [HttpGet]
        public async Task<ActionResult> GetArticleConcepts([FromQuery] Guid articleId, [FromQuery] Guid conceptTypeId)
        {
            if (articleId == null)
            {
                return BadRequest("missing article id");
            }

            var article = await _context.Articles
                .Where(a => a.Id == articleId)
                .Include(a => a.Campaign)
                    .ThenInclude(c => c.Members)
                .Include(a => a.ArticleConcepts)
                    .ThenInclude(aq => aq.Concept)
                .FirstOrDefaultAsync();

            if (article == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, article.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }


            return Ok(article.ArticleConcepts.Where(ac => ac.Concept.ConceptTypeId == conceptTypeId));
        }

        [HttpGet("articles/{conceptId}")]
        public async Task<IActionResult> GetArticlesForConcept([FromRoute] Guid conceptId)
        {
            var concept = await _context.Concepts
                .Where(c => c.Id == conceptId)
                .AsNoTracking()
                .Include(c => c.ConceptType)
                    .ThenInclude(c => c.Campaign)
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

            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, concept.ConceptType.Campaign, "CampaignEditPolicy");

            var articleConceptQuery = _context.ArticleConcepts
                .Where(ac => ac.ConceptId == concept.Id);

            if (!campaignEditableAuthResult.Succeeded)
            {
                articleConceptQuery = articleConceptQuery
                    .Where(ac => ac.Article.Published == true);
            }

            articleConceptQuery = articleConceptQuery
                .Include(ac => ac.Article);

            var articleConcepts = await articleConceptQuery.ToListAsync();

            return Ok(articleConcepts);
        }

        [HttpPost("buy")]
        public async Task<IActionResult> BuyArticleConcept(ArticleConcept articleConcept, [FromQuery] int? quantity, [FromQuery] Guid entityId)
        {
            if (quantity == null)
            {
                quantity = 1;
            } else if (quantity <= 0)
            {
                return NoContent();
            }

            var existingArticleConcept = await _context.ArticleConcepts
                .Where(ac => ac.ConceptId == articleConcept.ConceptId && ac.ArticleId == articleConcept.ArticleId)
                .Include(ac => ac.Concept)
                .FirstOrDefaultAsync();

            if (existingArticleConcept == null)
            {
                return NotFound();
            }

            var entity = await _context.Entities
                .Where(e => e.Id == entityId)
                .Include(e => e.Preset)
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

            // Check that the concept can be bought
            if (!existingArticleConcept.IsPurchasable)
            {
                return BadRequest("concept is not for purchase");
            }

            // Check that he seller has currency enabled
            if (!entity.Preset.IsCurrencyEnabled)
            {
                return BadRequest("entity does not have currency enabled");
            }

            // Check that the buyer can afford this
            if (!CurrencyStore.HasResources(
                entity.Currency,
                CurrencyStore.Multiply(existingArticleConcept.CurrencyCost,
                (int)quantity),
                entity.Campaign.CurrencyMap.ToArray(),
                entity.Campaign.TrackCoins))
            {
                return BadRequest("not enough currency");
            }

            // Check that the seller has enough of the concept
            if (existingArticleConcept.Quantity != null && existingArticleConcept.Quantity - quantity < 0)
            {
                return BadRequest("not enough quantity to satisfy order");
            }

            if (existingArticleConcept.TrackOnEntity && !entity.Preset.ConceptTypesEnabled.Contains(existingArticleConcept.Concept.ConceptTypeId))
            {
                return BadRequest("entity cannot have this concept type");
            }

            if (existingArticleConcept.Quantity != null)
            {
                // Make Updates
                existingArticleConcept.Quantity -= quantity;
                _context.Entry(existingArticleConcept).State = EntityState.Modified;
            }

            if (existingArticleConcept.TrackOnEntity)
            {
                var existingEntityConcept = await _context.ConceptEntities
                    .Where(ce => ce.ConceptId == existingArticleConcept.ConceptId && ce.EntityId == entity.Id)
                    .FirstOrDefaultAsync();

                if (existingEntityConcept == null)
                {
                    var newEntityConcept = new ConceptEntity
                    {
                        ConceptId = articleConcept.ConceptId,
                        EntityId = entity.Id,
                        Quantity = quantity,
                        SortValue = -1,
                        Fields = new List<Field>(),
                    };

                    _context.ConceptEntities.Add(newEntityConcept);
                } else
                {
                    existingEntityConcept.Quantity += quantity;
                    _context.Entry(existingEntityConcept).State = EntityState.Modified;
                }
            }

            entity.Currency = CurrencyStore.Subtract(
                entity.Currency,
                CurrencyStore.Multiply(existingArticleConcept.CurrencyCost, (int)quantity),
                entity.Campaign.CurrencyMap.ToArray(),
                entity.Campaign.TrackCoins);
            _context.Entry(entity).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            await _hub.Clients.Group($"entity-{entity.Id}")
                .SendAsync("EntityUpdate", entity);

            await _hub.Clients
                .Group($"article-{articleConcept.ArticleId}")
                .SendAsync("ConceptArticleUpdate", articleConcept);

            return NoContent();
        }

        // PUT: api/ArticleConcepts
        [HttpPut]
        public async Task<IActionResult> PutArticleConcept(ArticleConcept articleConcept)
        {
            var article = await _context.Articles
                .Where(a => a.Id == articleConcept.ArticleId)
                .Include(a => a.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (article == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, article.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var concept = await _context.Concepts
                .Where(q => q.Id == articleConcept.ConceptId)
                .FirstOrDefaultAsync();

            if (concept == null)
            {
                return NotFound();
            }

            articleConcept.Article = null;
            articleConcept.Concept = null;

            if (!ArticleConceptExists(articleConcept.ArticleId, articleConcept.ConceptId))
            {
                _context.ArticleConcepts.Add(articleConcept);
            }
            else
            {
                _context.Entry(articleConcept).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            await _context.Entry(articleConcept)
                .Reference(aq => aq.Concept)
                .LoadAsync();

            await _hub.Clients
                .Group($"article-{articleConcept.ArticleId}")
                .SendAsync("ConceptArticleUpdate", articleConcept);

            return Ok(articleConcept);
        }

        // DELETE: api/ArticleConcepts?conceptId=lskdjf&articleId=sldkjf
        [HttpDelete]
        public async Task<IActionResult> DeleteArticleConcept(Guid conceptId, Guid articleId)
        {
            var articleConcept = await _context.ArticleConcepts
                .Where(aq => aq.ConceptId == conceptId && aq.ArticleId == articleId)
                .Include(aq => aq.Article)
                    .ThenInclude(a => a.Campaign)
                .FirstOrDefaultAsync();

            if (articleConcept == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, articleConcept.Article.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.ArticleConcepts.Remove(articleConcept);
            await _context.SaveChangesAsync();

            await _hub.Clients
                .Group($"article-{articleConcept.ArticleId}")
                .SendAsync("ConceptArticleDelete", articleConcept);

            return Ok(articleConcept);
        }

        private bool ArticleConceptExists(Guid articleId, Guid conceptId)
        {
            return _context.ArticleConcepts.Any(aq => aq.ConceptId == conceptId && aq.ArticleId == articleId);
        }
    }
}

