namespace AskMe.Data.Models.ForgotPwRequests
{
    public class UpdatePwRequest
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }

    }
}
