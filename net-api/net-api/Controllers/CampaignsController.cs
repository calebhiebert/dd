using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class CampaignsController : ControllerBase
    {
        private readonly Context _context;

        public CampaignsController(Context context)
        {
            _context = context;
        }

        // GET: api/Campaigns
        [HttpGet]
        public IEnumerable<Campaign> GetCampaigns()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return _context.Campaigns.Include(c => c.Members)
                .Where(c => c.UserId == userId || c.Members.Any(m => m.UserId == userId));
        }

        // GET: api/Campaigns/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCampaign([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var campaign = await _context.Campaigns
                .Include(c => c.EntityPresets)
                .Include(c => c.Entities)
                .Include("Members.User")
                .Where(c => c.UserId == userId || c.Members.Any(m => m.UserId == userId))
                .FirstOrDefaultAsync(u => u.Id == id);

            if (campaign == null)
            {
                return NotFound();
            }

            return Ok(campaign);
        }

        // PUT: api/Campaigns/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaign([FromRoute] string id, [FromBody] Campaign campaign)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != campaign.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var existingCampaign = await _context.Campaigns.AsNoTracking()
                .Where(c => c.Id == id).FirstOrDefaultAsync();

            if (existingCampaign == null)
            {
                return NotFound();
            }

            if (userId != campaign.UserId)
            {
                return BadRequest("not the owner of the campaign");
            }

            campaign.UserId = existingCampaign.UserId;

            _context.Entry(campaign).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignExists(id))
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

        // POST: api/Campaigns
        [HttpPost]
        public async Task<IActionResult> PostCampaign([FromBody] Campaign campaign)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            campaign.Id = Nanoid.Nanoid.Generate();
            campaign.CreatedAt = new System.DateTime();

            var campaignUser = new CampaignUser
            {
                CampaignId = campaign.Id,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            };

            campaign.Members.Add(campaignUser);

            _context.Campaigns.Add(campaign);
            _context.CampaignUsers.Add(campaignUser);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaign", new { id = campaign.Id }, campaign);
        }

        // DELETE: api/Campaigns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaign([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (campaign.UserId != userId)
            {
                return BadRequest("do not own campaign");
            }

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();

            return Ok(campaign);
        }

        private bool CampaignExists(string id)
        {
            return _context.Campaigns.Any(e => e.Id == id);
        }
    }
}