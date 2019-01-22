using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace net_api.Controllers
{
    [Route("api/upload")]
    [ApiController]
    [Authorize]
    public class ImageController : Controller
    {
        Cloudinary _cloudinary;

        public ImageController()
        {
            _cloudinary = new Cloudinary(
                new Account(
                    "dqhk8k6iv",
                    Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY"),
                    Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET")
                    ));
        }

        [HttpPost]
        public IActionResult UploadImage([FromForm]IFormFile file)
        {
            if (file == null)
            {
                return BadRequest("missing file");
            }

            var uploadParams = new ImageUploadParams();
            uploadParams.File = new FileDescription(file.Name, file.OpenReadStream());
            uploadParams.Colors = true;
            uploadParams.UploadPreset = "server_upload";

            var uploadResult = _cloudinary.Upload(uploadParams);

            if (uploadResult.Error != null)
            {
                return BadRequest(uploadResult);
            }

            return Ok(uploadResult);
        }
    }
}