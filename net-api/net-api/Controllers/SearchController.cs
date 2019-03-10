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
    [Authorize]
    public class SearchController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;

        public SearchController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        [HttpGet]
        public async Task<IActionResult> DoSearch([FromQuery] string search, [FromQuery] Guid campaignId)
        {
            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                    .ThenInclude(m => m.User)
                .FirstOrDefaultAsync();

            if (campaign == null)
            {
                return Forbid();
            }

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var campaignEditableAuthResult = await _auth.AuthorizeAsync(User, campaign, "CampaignEditPolicy");

            if (search == null)
            {
                search = "";
            }

            search = search.Trim().ToLower();

            // Do searches
            var articleQuery = _context.Articles
                .Where(a => a.CampaignId == campaign.Id)
                .Where(a => a.Name.ToLower().Contains(search));

            var questQuery = _context.Quests
                .Where(q => q.CampaignId == campaign.Id)
                .Where(q => q.Name.ToLower().Contains(search));

            var entityQuery = _context.Entities
                .Where(e => e.CampaignId == campaign.Id)
                .Where(e => e.Name.ToLower().Contains(search))
                .Where(e => e.Spawnable == false && e.SpawnedFromId == null);

            var mapQuery = _context.Maps
                .Where(m => m.CampaignId == campaign.Id)
                .Where(m => m.Name.ToLower().Contains(search));

            // Hide items that normal players should not be able to see
            if (!campaignEditableAuthResult.Succeeded)
            {
                articleQuery = articleQuery
                    .Where(a => a.Published == true);

                questQuery = questQuery
                    .Where(q => q.Visible == true);

                mapQuery = mapQuery
                    .Where(m => m.PlayerVisible == true);
            }

            var finalMapQuery = mapQuery.Select(m => new MapMini { Name = m.Name, Id = m.Id });

            var articleTask = articleQuery.Take(2).ToListAsync();
            var questTask = questQuery.Take(2).ToListAsync();
            var entityTask = entityQuery.Take(2).ToListAsync();
            var mapTask = finalMapQuery.Take(2).ToListAsync();

            await Task.WhenAll(articleTask, questTask, entityTask, mapTask);

            var searchResults = new List<SearchResult>();

            articleTask.Result.ForEach(a => searchResults.Add(new ArticleSearchResult(a)));
            questTask.Result.ForEach(q => searchResults.Add(new QuestSearchResult(q)));
            entityTask.Result.ForEach(e => searchResults.Add(new EntitySearchResult(e)));
            mapTask.Result.ForEach(m => searchResults.Add(new MapSearchResult(m)));
            campaign.Members
                .Where(m => m.User.Username.ToLower().Contains(search))
                .Take(2).ToList()
                .ForEach(m => searchResults.Add(new UserSearchResult(m.User)));

            return Ok(searchResults);
        }
    }
}