﻿using AskMe.Data.Entities;

namespace AskMe.Repositories.User
{
    public interface IUserRepository
    {
        Task<PasswordToken> CreatePasswordToken(PasswordToken passwordToken);
        Task<PasswordToken> GetPasswordToken(string token);
        Task UseToken(PasswordToken passwordToken);

    }
}
