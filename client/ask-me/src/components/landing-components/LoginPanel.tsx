import React from 'react'
import { useState } from 'react';
import { LoginUserDto, User } from '../../types/types';
import { fetchLoginUser } from '../../scripts/scripts';
import { useNavigate } from 'react-router-dom';

function LoginPanel() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e: any) => {
        e.preventDefault()

        const loginUser: LoginUserDto = {
            email,
            password
        }
        const logedInUser: User = await fetchLoginUser(loginUser)
        localStorage.setItem("user", JSON.stringify(logedInUser))
        navigate("/dashboard");
    }

    return (
        <div className='flex flex-col justify-center bg-accent-50 rounded-l-4xl'>
            <form className='flex flex-col justify-evenly items-center h-[35%]' onSubmit={(e) => handleLogin(e)}>
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="email">Email:</label>
                    <input
                        className='bg-white'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="password">Password:</label>
                    <input
                        className='bg-white'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-center mt-5'>
                    <button
                        type="submit"
                        className="cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                        Login
                    </button>
                </div>
            </form >
        </div >
    );
}

export default LoginPanel