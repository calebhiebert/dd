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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var query = _context.Articles
                .Where(a => a.CampaignId == campaign.Id);

            if (userId != campaign.UserId)
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

            query = query.Skip(offset).Take(limit);

            if (search != null)
            {
                search = search.ToLower();

                query = query
                    .Where(a => a.Name.ToLower().Contains(search));
            }

            // TODO filter out article quests that should not be shown
            var articles = await query
                .Include(a => a.ArticleQuests)
                .ToListAsync();

            return Ok(articles.Select(a => new SearchedArticle(a, null)));
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
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == article.CampaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
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

            if (article.MapId == null)
            {
                article.MapId = originalArticle.MapId;
                article.Lat = originalArticle.Lat;
                article.Lng = originalArticle.Lng;
            }

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

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            if (article.Published)
            {
                await _hub.Clients.Group($"campaign-{article.CampaignId}")
                    .SendAsync("ArticleCreate", article);
            }

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(Guid id)
        {
            var article = await _context.Articles.Where(a => a.Id == id).Include(a => a.Campaign).FirstOrDefaultAsync();
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
