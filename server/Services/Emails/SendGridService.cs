namespace AskMe.Services.Emails
{
    using Microsoft.Extensions.Options;
    using SendGrid;
    using SendGrid.Helpers.Mail;

    public class SendGridSettings
    {
        public string ApiKey { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
    }

    public class SendGridEmailService
    {
        private readonly SendGridSettings _settings;

        public SendGridEmailService(IOptions<SendGridSettings> options)
        {
            _settings = options.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlContent)
        {
            Console.WriteLine($"######################################################################################################## {_settings.ApiKey}");

            var client = new SendGridClient(_settings.ApiKey);
            var from = new EmailAddress(_settings.SenderEmail, _settings.SenderName);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent: null, htmlContent);
            var response = await client.SendEmailAsync(msg);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Failed to send email: {response.StatusCode}");
            }
        }
    }

}
