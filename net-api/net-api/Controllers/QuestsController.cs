using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestsController : ControllerBase
    {
        private readonly Context _context;

        public QuestsController(Context context)
        {
            _context = context;
        }

        // GET: api/Quests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quest>>> GetQuests(
            [FromQuery] Guid campaignId,
            [FromQuery] string search,
            [FromQuery] int? limit,
            [FromQuery] int? offset
            )
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var campaign = await _context.Campaigns
                .Include(c => c.Members)
                .FirstOrDefaultAsync(c => c.Id == campaignId);

            if (campaign == null)
            {
                return NotFound();
            } else if (!campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("not part of campaign");
            }

            var query = _context.Quests.Where(q => q.CampaignId == campaign.Id);

            if (userId != campaign.UserId)
            {
                query = query.Where(q => q.Visible == true);
            }

            if (search != null)
            {
                query = query
                    .Where(q => 
                        q.Name.ToLower()
                        .Contains(search.Trim().ToLower()) || q.Description.ToLower().Contains(search.Trim().ToLower())
                    );
            }

            if (limit == null)
            {
                limit = 10;
            } else if (limit > 50)
            {
                limit = 50;
            } else if (limit <= 0)
            {
                limit = 10;
            }

            if (offset < 0 || offset == null)
            {
                offset = 0;
            }

            query = query
                .OrderBy(q => q.Name)
                .Skip((int)offset)
                .Take((int)limit);

            var quests = await query.ToListAsync();

            return Ok(quests);
        }

        // GET: api/Quests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quest>> GetQuest(Guid id)
        {
            var quest = await _context.Quests.FindAsync(id);

            if (quest == null)
            {
                return NotFound();
            }

            return quest;
        }

        // PUT: api/Quests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuest(Guid id, Quest quest)
        {
            if (id != quest.Id)
            {
                return BadRequest();
            }

            _context.Entry(quest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestExists(id))
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

        // POST: api/Quests
        [HttpPost]
        public async Task<ActionResult<Quest>> PostQuest(Quest quest)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            _context.Quests.Add(quest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuest", new { id = quest.Id }, quest);
        }

        // DELETE: api/Quests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Quest>> DeleteQuest(Guid id)
        {
            var quest = await _context.Quests.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            _context.Quests.Remove(quest);
            await _context.SaveChangesAsync();

            return quest;
        }

        private bool QuestExists(Guid id)
        {
            return _context.Quests.Any(e => e.Id == id);
        }
    }
}
