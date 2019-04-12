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
    public class PurchasesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthorizationService _auth;


        public PurchasesController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<IActionResult> GetPurchaseHistory(Guid campaignId, Guid? entityId, Guid? articleId, Guid? conceptId, int? limit, int? offset)
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

            var purchaseQuery = _context.PurchaseHistory.AsQueryable();

            if (entityId != null)
            {
                purchaseQuery = purchaseQuery
                    .Where(p => p.EntityId == entityId)
                    .Include(p => p.Article)
                    .Include(p => p.Concept);
            }

            if (articleId != null)
            {
                purchaseQuery = purchaseQuery
                    .Where(p => p.ArticleId == articleId)
                    .Include(p => p.Entity)
                    .Include(p => p.Concept);
            }

            if (conceptId != null)
            {
                purchaseQuery = purchaseQuery
                    .Where(p => p.ConceptId == conceptId)
                    .Include(p => p.Entity)
                    .Include(p => p.Article);
            }

            var count = await purchaseQuery.CountAsync();

            purchaseQuery = purchaseQuery
                .OrderByDescending(p => p.DateTime);

            if (limit == null || limit <= 0)
            {
                limit = 10;
            } else if (limit > 50)
            {
                limit = 50;
            }

            if (offset == null || offset < 0)
            {
                offset = 0;
            }

            purchaseQuery = purchaseQuery
                .Skip((int)offset)
                .Take((int)limit);

            var purchases = await purchaseQuery.ToListAsync();

            return Ok(new { Total = count, Purchases = purchases });
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(Guid id)
        {
            var purchase = await _context.PurchaseHistory
                .Where(ph => ph.Id == id)
                .Include(p => p.Entity)
                    .ThenInclude(e => e.Campaign)
                        .ThenInclude(c => c.Members)
                .Include(p => p.Article)
                .Include(p => p.Concept)
                .FirstOrDefaultAsync();

            if (purchase == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, purchase.Entity.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return purchase;
        }

        private bool PurchaseExists(Guid id)
        {
            return _context.PurchaseHistory.Any(e => e.Id == id);
        }
    }
}
