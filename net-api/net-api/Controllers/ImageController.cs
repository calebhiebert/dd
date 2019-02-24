using System;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/upload")]
    [ApiController]
    [Authorize]
    public class ImageController : Controller
    {
        Cloudinary _cloudinary;
        private readonly IAuthorizationService _auth;
        private readonly Context _context;


        public ImageController(IAuthorizationService auth, Context context)
        {
            _cloudinary = new Cloudinary(
                new Account(
                    "dqhk8k6iv",
                    Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY"),
                    Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET")
                    ));
            _auth = auth;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm]IFormFile file, [FromForm]Guid? campaignId)
        {
            if (file == null)
            {
                return BadRequest("missing file");
            }

            if (campaignId == null)
            {
                return BadRequest("missing campaign id");
            }

            var campaign = await _context.Campaigns
                .Where(c => c.Id == campaignId)
                .Include(c => c.Members)
                .FirstOrDefaultAsync();

            var authResult = await _auth.AuthorizeAsync(User, campaign, "CampaignViewPolicy");

            if (!authResult.Succeeded)
            {
                return Forbid();
            }

            var uploadParams = new ImageUploadParams();
            uploadParams.File = new FileDescription(file.Name, file.OpenReadStream());
            uploadParams.Colors = true;
            uploadParams.UploadPreset = "server_upload";
            uploadParams.Folder = $"Public/{campaignId.ToString()}";
            uploadParams.Tags = $"{campaignId.ToString()}";

            var uploadResult = _cloudinary.Upload(uploadParams);

            if (uploadResult.Error != null)
            {
                return BadRequest(uploadResult);
            }

            return Ok(uploadResult);
        }
    }
}