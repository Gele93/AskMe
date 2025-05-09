﻿namespace AskMe.Data.Entities
{
    public class PasswordToken
    { 
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool IsUsed { get; set; }
    }
}
