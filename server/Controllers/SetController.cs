using Microsoft.AspNetCore.Mvc;
using AskMe.Services.Formaters;
using AskMe.Services.Readers;
using AskMe.Services.Sets;
using AskMe.Data.Models.Sets;

namespace AskMe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SetController : ControllerBase
    {
        private readonly ILogger<SetController> _logger;
        private readonly ISetService _setService;
        public SetController(ILogger<SetController> logger, ISetService setService)
        {
            _logger = logger;
            _setService = setService;
        }

        [HttpPost("formated")]
        public async Task<IActionResult> CreateSetFromFormatedTxt(SetRequest setReq)
        {
            if (setReq.file is null) return BadRequest("No file uploaded");

            try
            {
                var set = _setService.CreateFormatedSet(setReq);
                return Ok(set);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Uploading file went wrong.");
            }
        }

        [HttpPost("unformated")]
        public async Task<IActionResult> CreateSetFromUnFormatedTxt(SetRequest setReq)
        {
            if (setReq.file is null) return BadRequest("No file uploaded");

            try
            {
                var set = _setService.CreateFormatedSet(setReq);
                return Ok(set);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Uploading file went wrong.");
            }
        }

    }
}
