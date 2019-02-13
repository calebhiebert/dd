using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly Context _context;

        public ArticlesController(Context context)
        {
            _context = context;
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

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (campaign.UserId != userId && !campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("no permissions");
            }

            var query = _context.Articles.Where(a => a.CampaignId == campaign.Id);

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
                    .Where(a => a.Name.ToLower().Contains(search) || a.Text.ToLower().Contains(search));
            }

            var articles = await query.Select(a => new { a.CampaignId, a.UserId, a.Id, a.Name, a.Published, a.CreatedAt }).ToListAsync();

            return Ok(articles);
        }

        [HttpGet("map/{id}")]
        public async Task<IActionResult> GetMapArticles(Guid id)
        {
            var map = await _context.Maps.Where(m => m.Id == id)
                .FirstOrDefaultAsync();

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

            var originalArticle = await _context.Articles.Where(a => a.Id == id).AsNoTracking().FirstOrDefaultAsync();

            if (originalArticle == null)
            {
                return NotFound();
            }

            if (article.Text == null)
            {
                article.Text = originalArticle.Text;
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

            return NoContent();
        }

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle(Article article)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            article.UserId = userId;

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = article.Id }, article);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle(Guid id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return article;
        }

        private bool ArticleExists(Guid id)
        {
            return _context.Articles.Any(e => e.Id == id);
        }
    }
}
