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
        private readonly IAuthorizationService _auth;

        public InventoryItemsController(Context context, IAuthorizationService auth)
        {
            _context = context;
            _auth = auth;
        }

        // GET: api/InventoryItems
        [HttpGet]
        public async Task<ActionResult> GetInventoryItems([FromQuery]Guid entityId)
        {
            var entity = await _context.Entities
                .Where(e => e.Id == entityId)
                .Include(e => e.InventoryItems)
                    .ThenInclude(ii => ii.Item)
                .Include(e => e.Campaign)
                    .ThenInclude(c => c.Members)
                .FirstOrDefaultAsync();

            if (entity == null)
            {
                return NotFound();
            }

            var authResult = await _auth.AuthorizeAsync(User, entity.Campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            return Ok(entity.InventoryItems);
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

            var authResult = await _auth.AuthorizeAsync(User, entity, "EntityEditPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
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
                .Include(ii => ii.Entity)
                    .ThenInclude(e => e.Campaign)
                .FirstOrDefaultAsync();

            if (inventoryItem == null)
            {
                return NotFound();
            }

            var authResult = _auth.AuthorizeAsync(User, inventoryItem.Entity, "EntityEditPolicy");

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
