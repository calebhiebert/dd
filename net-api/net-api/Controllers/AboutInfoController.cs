using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_api.Models;

namespace net_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutInfoController : ControllerBase
    {
        // GET: api/AboutInfo
        [HttpGet]
        public AboutInfo Get()
        {
            return new AboutInfo
            {
                GitHash = "REPLACE_GIT_HASH",
                GitTag = "REPLACE_GIT_TAG",
            };
        }
    }
}
