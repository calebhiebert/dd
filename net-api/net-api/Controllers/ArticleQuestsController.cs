using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ArticleQuestsController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public ArticleQuestsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/ArticleQuests
        [HttpGet]
        public async Task<ActionResult> GetArticleQuests([FromQuery] Guid articleId)
        {
            if (articleId == null)
            {
                return BadRequest("missing article id");
            }

            var article = await _context.Articles
                .Where(a => a.Id == articleId)
                .Include(a => a.Campaign)
                    .ThenInclude(c => c.Members)
                .Include(a => a.ArticleQuests)
                    .ThenInclude(aq => aq.Quest)
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

            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, article.Campaign, "CampaignEditPolicy");

            // If the user can edit the campaign, they can see hidden quests
            if (campaignEditableAuthResult.Succeeded)
            {
                return Ok(article.ArticleQuests);
            } else
            {
                var filteredArticleQuests = article.ArticleQuests
                    .FindAll(aq => aq.Quest.Visible == true);

                return Ok(filteredArticleQuests);
            }
        }

        // PUT: api/ArticleQuests
        [HttpPut]
        public async Task<IActionResult> PutArticleQuest(ArticleQuest articleQuest)
        {
            _context.Entry(articleQuest).State = EntityState.Modified;

            var article = await _context.Articles
                .Where(a => a.Id == articleQuest.ArticleId)
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

            var quest = await _context.Quests
                .Where(q => q.Id == articleQuest.QuestId)
                .FirstOrDefaultAsync();

            if (quest == null)
            {
                return NotFound();
            }

            articleQuest.Article = null;
            articleQuest.Quest = null;

            var existingItem = _context.ArticleQuests
                .Where(aq => aq.QuestId == quest.Id && aq.ArticleId == article.Id)
                .FirstOrDefaultAsync();

            if (existingItem == null)
            {
                _context.ArticleQuests.Add(articleQuest);
            } else
            {
                _context.Entry(articleQuest).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/ArticleQuests?questId=lskdjf&articleId=sldkjf
        [HttpDelete]
        public async Task<ActionResult<ArticleQuest>> DeleteArticleQuest(Guid questId, Guid articleId)
        {
            var articleQuest = await _context.ArticleQuests
                .Where(aq => aq.QuestId == questId && aq.ArticleId == articleId)
                .Include(aq => aq.Article)
                    .ThenInclude(a => a.Campaign)
                .FirstOrDefaultAsync();

            if (articleQuest == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, articleQuest.Article.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            _context.ArticleQuests.Remove(articleQuest);
            await _context.SaveChangesAsync();

            return articleQuest;
        }
    }
}
