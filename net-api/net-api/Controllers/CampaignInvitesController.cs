using System;
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
    public class CampaignInvitesController : ControllerBase
    {
        private readonly Context _context;

        public CampaignInvitesController(Context context)
        {
            _context = context;
        }

        // GET: api/CampaignInvites
        [HttpGet]
        public IActionResult GetCampaignInvites([FromQuery(Name = "campaignId")] string campaignId)
        {
            if (campaignId == null)
            {
                return BadRequest("Missing campaign id");
            }

            return Ok(_context.CampaignInvites.Where(c => c.CampaignId == campaignId).ToList());
        }

        // GET: api/CampaignInvites/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCampaignInvite([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignInvite = await _context.CampaignInvites.FindAsync(id);

            if (campaignInvite == null)
            {
                return NotFound();
            }

            return Ok(campaignInvite);
        }

        [HttpPost("{id}/accept")]
        [Authorize]
        public async Task<IActionResult> AcceptInvite([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignInvite = await _context.CampaignInvites.FindAsync(id);

            if (campaignInvite == null)
            {
                return NotFound();
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = new CampaignUser
            {
                UserId = userId,
                CampaignId = campaignInvite.CampaignId
            };

            campaignInvite.Status = CampaignInviteStatus.Accepted;
            campaignInvite.AcceptedUserId = userId;

            _context.Add(user);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClaimType(Claim obj)
        {
            throw new NotImplementedException();
        }

        // PUT: api/CampaignInvites/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaignInvite([FromRoute] string id, [FromBody] CampaignInvite campaignInvite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != campaignInvite.Id)
            {
                return BadRequest();
            }

            _context.Entry(campaignInvite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignInviteExists(id))
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

        // POST: api/CampaignInvites
        [HttpPost]
        public async Task<IActionResult> PostCampaignInvite([FromBody] CampaignInvite campaignInvite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CampaignInvites.Add(campaignInvite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaignInvite", new { id = campaignInvite.Id }, campaignInvite);
        }

        // DELETE: api/CampaignInvites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaignInvite([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaignInvite = await _context.CampaignInvites.FindAsync(id);
            if (campaignInvite == null)
            {
                return NotFound();
            }

            _context.CampaignInvites.Remove(campaignInvite);
            await _context.SaveChangesAsync();

            return Ok(campaignInvite);
        }

        private bool CampaignInviteExists(string id)
        {
            return _context.CampaignInvites.Any(e => e.Id == id);
        }
    }
}