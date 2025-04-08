using AskMe.Data.Models.Utils;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

namespace AskMe.Services.Formaters
{
    public class TxtFormater : ITxtFormater
    {
        private readonly ILogger<TxtFormater> _logger;
        private readonly string _apiKey = "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";
        private readonly string _apiKey2 = "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";

        public TxtFormater(ILogger<TxtFormater> logger)
        {
            _logger = logger;
        }

        public async Task<string> GeneralizeText(string fileContent)
        {
            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromMinutes(5);

                string url = "https://openrouter.ai/api/v1/chat/completions";

                string prompt =
                    $"The below sent text contains questions and answers possibly grouped into themes for an exam." +
                    $"Format the text by these rules:" +
                    $"Each theme has '##' inserted as the first 2 character" +
                    $"Each question has '#' inserted as the first character" +
                    $"Each answer has '-' inserted as the first character" +
                    $"Return nothing else but the formated text" +
                    $"The given text starts here:";

                var bodyContent =
                    $"{prompt}" +
                    $"{fileContent}";

                var requestBody = new
                {
                    model = "deepseek/deepseek-chat-v3-0324:free",
                    messages = new[]
                    {
                        new
                        {
                            role = "user",
                            content = bodyContent
                        }
                    }
                };

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey2);
                string json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(url, content);
                string responseString = await response.Content.ReadAsStringAsync();
                _logger.LogInformation($"Response string from AI tool: {responseString}");

                return GetMessageContent(responseString);
            }
        }

        private string GetMessageContent(string responseString)
        {
            JsonDocument responseBody = JsonDocument.Parse(responseString);
            var responseChoices = responseBody.RootElement.GetProperty("choices");
            var responseMessage = responseChoices[0].GetProperty("message");
            var responseContent = responseMessage.GetProperty("content").GetString();
            return responseContent;
        }
    }
}
