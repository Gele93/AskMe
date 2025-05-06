namespace AskMe.Services.Emails
{
    public static class EmailTemplates
    {
        public static string ResetPassword(string token, string email)
        {
            return $@"
                <html>
                    <body>
                        <h1>Reset your password</h1>
                        <br/>
                        <p>Click the link below to reset your password:</p>
                        <a href='http://localhost:5173/reset-password?token={token}&email={email}'>Reset Password</a>
                        <p>If you did not request a password reset, please ignore this email.</p>   
                        <h6>The link can be used only once!</h6>
                    </body>
                </html>";
        }
    }
}
