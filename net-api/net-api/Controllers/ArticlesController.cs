using System;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
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
    public class ArticlesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;
        private readonly IHubContext<UpdateHub> _hub;

        public ArticlesController(Context context, IAuthorizationService auth, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _auth = auth;
            _hub = hub;
        }

        // GET: api/Articles
        [HttpGet]
        public async Task<IActionResult> SearchArticles(Guid campaignId, int limit, int offset, string search)
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var editableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            var query = _context.Articles
                .Where(a => a.CampaignId == campaign.Id);

            if (!editableAuthResult.Succeeded)
            {
                query = query.Where(a => a.Published == true);
            }

            if (limit <= 0)
            {
                limit = 10;
            } else if (limit > 50)
            {
                limit = 50;
            }

            if (offset <= 0)
            {
                offset = 0;
            }

            if (search != null)
            {
                search = search.ToLower();

                query = query
                    .Where(a => a.Name.ToLower().Contains(search));
            }

            query = query.Skip(offset).Take(limit);

            // TODO filter out article quests that should not be shown
            var articles = await query
                .Include(a => a.ArticleQuests)
                .Include(a => a.ArticleConcepts)
                    .ThenInclude(ac => ac.Concept)
                .OrderBy(a => a.CreatedAt)
                .ToListAsync();

            return Ok(articles.Select(a => new SearchedArticle(a, null)));
        }
        
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularArticles(Guid campaignId)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var editableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            var query = _context
                .Query<ArticlePopularity>()
                .FromSql(@"SELECT COUNT(""ArticleId"") AS ""Views"", ""ArticleId""
                             FROM ""AssetViews""
                               JOIN ""Articles"" ON ""AssetViews"".""ArticleId"" = ""Articles"".""Id""
                             WHERE ""ArticleId"" IS NOT NULL AND ""AssetViews"".""CampaignId""={0}
                               AND ""DateTime"" > ((now() at time zone 'utc') - interval '8 hours')
                               AND ""Articles"".""Published"" = true
                             GROUP BY ""ArticleId""
                             ORDER BY ""Views"" DESC
                             LIMIT 6", campaign.Id)
                .Include(ap => ap.Article);

            var results = await query.ToListAsync();

            return Ok(results.Select(r => new SearchedArticle(r.Article)));
        }

        [HttpGet("map/{id}")]
        public async Task<IActionResult> GetMapArticles(Guid id)
        {
            var map = await _context.Maps.Where(m => m.Id == id)
                .Include(m => m.Campaign).ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, map.Campaign, "CampaignViewPolicy");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var articleQuery = _context.Articles.Where(a => a.MapId == id);

            if (userId != map.UserId)
            {
                articleQuery = articleQuery.Where(a => a.Published == true);
            }

            var articles = await articleQuery.ToListAsync();

            return Ok(articles);
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(Guid id)
        {
            var article = await _context.Articles
                .Where(a => a.Id == id)
                .Include(a => a.Campaign)
                    .ThenInclude(c => c.Members)
                .Include(a => a.ArticleQuests)
                    .ThenInclude(aq => aq.Quest)
                .Include(a => a.ArticleConcepts)
                    .ThenInclude(ac => ac.Concept)
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

            _context.AssetViews.Add(new AssetView(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, article.CampaignId)
            {
                ArticleId = article.Id,
            });
            await _context.SaveChangesAsync();

            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, article.Campaign, "CampaignEditPolicy");

            if (!campaignEditableAuthResult.Succeeded)
            {
                article.ArticleQuests = article.ArticleQuests.Where(aq => aq.Quest.Visible == true).ToList();
            }

            return article;
        }

        // PUT: api/Articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(Guid id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }

            var originalArticle = await _context.Articles
                .Where(a => a.Id == id)
                .Include(a => a.Campaign)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (originalArticle == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, originalArticle.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            if (article.Content == null)
            {
                article.Content = originalArticle.Content;
            }

            article.ArticleConcepts = null;
            article.ArticleQuests = null;
            article.Campaign = null;
            article.Map = null;
            article.User = null;

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            if (article.Published)
            {
                await _hub.Clients.Group($"campaign-{article.CampaignId}")
                    .SendAsync("ArticleUpdate", article);
            } else
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                await _hub.Clients.Group($"notifications-{userId}")
                    .SendAsync("ArticleUpdate", article);
            }

            return NoContent();
        }

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            var campaign = await _context.Campaigns.Where(c => c.Id == article.CampaignId).FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            article.UserId = userId;
            article.Id = Guid.NewGuid();
            article.ArticleConcepts = null;
            article.ArticleQuests = null;
            article.Campaign = null;
            article.Map = null;
            article.User = null;

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            if (article.Published)
            {
                await _hub.Clients.Group($"campaign-{article.CampaignId}")
                    .SendAsync("ArticleCreate", article);
            }

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }

        // POST: api/Articles/makecopy/5
        [HttpPost("makecopy/{articleId}")]
        public async Task<IActionResult> CopyArticle(Guid articleId)
        {
            var originalArticle = await _context.Articles
                .Where(a => a.Id == articleId)
                .AsNoTracking()
                .Include(a => a.Campaign)
                    .ThenInclude(c => c.Members)
                .Include(a => a.ArticleConcepts)
                .Include(a => a.ArticleQuests)
                .FirstOrDefaultAsync();

            if (originalArticle == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, originalArticle.Campaign, "CampaignEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            originalArticle.Id = Guid.NewGuid();
            originalArticle.Name += " (Copy)";

            foreach (var concept in originalArticle.ArticleConcepts)
            {
                concept.Article = originalArticle;
                concept.ArticleId = originalArticle.Id;
            }

            foreach (var quest in originalArticle.ArticleQuests)
            {
                quest.ArticleId = originalArticle.Id;
                quest.Article = originalArticle;
            }

            originalArticle.Campaign = null;

            _context.Add(originalArticle);
            await _context.SaveChangesAsync();

            return Ok(originalArticle);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(Guid id)
        {
            var article = await _context.Articles
                .Where(a => a.Id == id)
                .Include(a => a.Campaign)
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

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            if (article.Published)
            {
                await _hub.Clients.Group($"campaign-{article.CampaignId}")
                    .SendAsync("ArticleDelete", article);
            }

            return article;
        }

        private string GetFirstImageId(string text)
        {
            var groups = Regex.Match(text, "<img.*?src=[\"'](.+?)[\"'].*?>", RegexOptions.IgnoreCase).Groups;

            if (groups.Count == 1)
            {
                return null;
            } 

            var url = groups[1].Value;

            var urlGroups = Regex.Match(url, "https://res.cloudinary.com/.+/image/upload/.+/(Public/.+/[0-9a-z]+)", RegexOptions.IgnoreCase).Groups;

            if (urlGroups.Count == 1)
            {
                return null;
            }

            return urlGroups[1].Value;   
        }

        private bool ArticleExists(Guid id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
