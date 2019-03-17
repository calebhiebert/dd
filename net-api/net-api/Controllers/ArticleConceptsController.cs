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
    public class ArticleConceptsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public ArticleConceptsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
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

            return Ok(articleConcept);
        }

        private bool ArticleConceptExists(Guid articleId, Guid conceptId)
        {
            return _context.ArticleConcepts.Any(aq => aq.ConceptId == conceptId && aq.ArticleId == articleId);
        }
    }
}

