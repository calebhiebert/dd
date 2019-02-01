using System;
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
    public class InventoryItemsController : ControllerBase
    {
        private readonly Context _context;

        public InventoryItemsController(Context context)
        {
            _context = context;
        }

        // GET: api/InventoryItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryItem>>> GetInventoryItems([FromQuery]Guid entityId)
        {
            // TODO authenticate requests
            // TODO verify that the inventory does not have this item already

            return await _context.InventoryItems.Where(i => i.EntityId == entityId).Include(i => i.Item).ToListAsync();
        }

        // GET: api/InventoryItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryItem>> GetInventoryItem(Guid id)
        {
            // TODO authenticate requests

            var inventoryItem = await _context.InventoryItems.FindAsync(id);

            if (inventoryItem == null)
            {
                return NotFound();
            }

            return inventoryItem;
        }

        // PUT: api/InventoryItems
        [HttpPut]
        public async Task<IActionResult> PutInventoryItem(InventoryItem inventoryItem)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var entity = await _context.Entities
                .Where(e => e.Id == inventoryItem.EntityId)
                .Include(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            // Check for correct permissions
            if (userId != entity.UserId && userId != entity.Campaign.UserId)
            {
                return BadRequest("no permissions");
            }

            // It's possible that the client could submit the item field
            // this is not ideal (because entity framework will track it), so we just clear it
            inventoryItem.Item = null;

            if (!InventoryItemExists(inventoryItem.EntityId, inventoryItem.ItemId))
            {
                _context.InventoryItems.Add(inventoryItem);
            } else
            {
                _context.Entry(inventoryItem).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InventoryItemExists(inventoryItem.EntityId, inventoryItem.ItemId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Because the item field was cleared above, but we want to send it in the response
            // we need to re populate it
            await _context.Entry(inventoryItem)
                .Reference(i => i.Item)
                .LoadAsync();

            return Ok(inventoryItem);
        }

        // DELETE: api/InventoryItems/1232156/Item/15365165
        [HttpDelete("{entId}/Item/{itmId}")]
        public async Task<ActionResult<InventoryItem>> DeleteInventoryItem([FromRoute] Guid entId, [FromRoute] Guid itmId)
        {
            var inventoryItem = await _context.InventoryItems
                .Where(i => i.EntityId == entId && i.ItemId == itmId)
                .FirstOrDefaultAsync();

            if (inventoryItem == null)
            {
                return NotFound();
            }

            // TODO authenticate requests

            _context.InventoryItems.Remove(inventoryItem);
            await _context.SaveChangesAsync();

            return inventoryItem;
        }

        private bool InventoryItemExists(Guid entityId, Guid itemId)
        {
            return _context.InventoryItems.Any(e => e.EntityId == entityId && e.ItemId == itemId);
        }
    }
}
