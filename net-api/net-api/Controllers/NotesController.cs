using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly Context _context;
        private readonly IHubContext<UpdateHub> _hub;

        public NotesController(Context context, IHubContext<UpdateHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes(
            [FromQuery] Guid? campaignId,
            [FromQuery] Guid? questId
            )
        {
            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var campaign = await _context.Campaigns
                .Include(c => c.Members)
                .Where(c => c.Id == campaignId)
                .FirstOrDefaultAsync();
        
            if (campaign == null)
            {
                return NotFound();
            }

            if (userId != campaign.UserId && !campaign.Members.Any(m => m.UserId == userId))
            {
                return BadRequest("No permissions");
            }

            var query = _context.Notes
                .Where(n => n.CampaignId == campaignId)
                .Where(n => n.UserId == userId || n.PublicView);

            if (questId != null)
            {
                query = query.Where(q => q.QuestId == questId);
            }

            return await query.ToListAsync();
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(Guid id)
        {
            var note = await _context.Notes.FindAsync(id);

            // TODO authorize request

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(Guid id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            // TODO authorize request
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            note.UserId = userId;
            note.User = null;

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Notify other users of the change
            if (note.PublicView)
            {
                await _hub.Clients.Group($"campaign-{note.CampaignId}")
                    .SendAsync("NoteUpdate", note);
            }

            return NoContent();
        }

        // POST: api/Notes
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            note.UserId = userId;
            note.User = null;

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            // Notify other users of the change
            if (note.PublicView)
            {
                await _hub.Clients.Group($"campaign-{note.CampaignId}")
                    .SendAsync("NoteCreate", note);
            }

            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> DeleteNote(Guid id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            // Notify other users of the change
            if (note.PublicView)
            {
                await _hub.Clients.Group($"campaign-{note.CampaignId}")
                    .SendAsync("NoteDelete", note);
            }

            return note;
        }

        private bool NoteExists(Guid id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
