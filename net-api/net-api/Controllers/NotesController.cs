﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class NotesController : ControllerBase
    {
        private readonly Context _context;

        public NotesController(Context context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes(
            [FromQuery] string campaignId,
            [FromQuery] string questId
            )
        {
            if (campaignId == null || campaignId == string.Empty)
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

            if (userId != campaign.Id && !campaign.Members.Any(m => m.UserId == userId))
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
        public async Task<ActionResult<Note>> GetNote(string id)
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
        public async Task<IActionResult> PutNote(string id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            // TODO authorize request
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            note.UserId = userId;

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

            return NoContent();
        }

        // POST: api/Notes
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> DeleteNote(string id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return note;
        }

        private bool NoteExists(string id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
