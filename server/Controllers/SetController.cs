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
        public async Task<IActionResult> CreateSetFromFormatedTxt([FromForm] SetRequest setReq)
        {
            if (setReq.file is null) return BadRequest("No file uploaded");

            try
            {
                string userId = "0ef31ca1-cdfc-4568-8db8-3fe958564e10";

                var set = await _setService.CreateFormatedSet(setReq, userId);
                return Ok(set);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while saving or creating set {ex.Message}");
                return StatusCode(500, "Uploading file went wrong.");
            }
        }

        [HttpPost("unformated")]
        public async Task<IActionResult> CreateSetFromUnFormatedTxt(SetRequest setReq)
        {
            if (setReq.file is null) return BadRequest("No file uploaded");

            try
            {
                string userId = "userId";

                var set = await _setService.CreateFormatedSet(setReq, userId);
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
