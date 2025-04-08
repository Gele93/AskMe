﻿using Microsoft.AspNetCore.Mvc;
using AskMe.Services.Formaters;
using AskMe.Services.Readers;
using AskMe.Services.Sets;
using AskMe.Data.Models.Sets;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.DataProtection;

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

        [HttpPost("formated/preview")]
        public async Task<IActionResult> CreateSetPreviewFromFormatedTxt([FromForm] SetRequest setReq)
        {
            if (setReq.file is null) return BadRequest("No file uploaded");

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId is null) return Unauthorized();

                var set = await _setService.CreateFormatedSetPreview(setReq, userId);
                return Ok(set);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while saving or creating set {ex.Message}");
                return StatusCode(500, "Uploading file went wrong.");
            }
        }

        [HttpPost("unformated/preview")]
        public async Task<IActionResult> CreateSetPreviewFromUnFormatedTxt([FromForm] SetRequest setReq)
        {
            if (setReq.file is null) return BadRequest("No file uploaded");

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId is null) return Unauthorized();

                var set = await _setService.CreateUnFormatedSetPreview(setReq, userId);
                return Ok(set);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while creating unformated preview: {ex.Message}");
                return StatusCode(500, "Uploading file went wrong.");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateSet(SetDto setData)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Unauthorized();

                await _setService.CreateSet(setData, userId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while saving or creating set {ex.Message}");
                return StatusCode(500, "Uploading file went wrong.");
            }
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId is null) return Unauthorized();

            try
            {
                var sets = await _setService.GetAll(userId);
                return Ok(sets);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting sets {ex.Message}");
                return StatusCode(500, "Error while getting sets");
            }
        }

    }
}
