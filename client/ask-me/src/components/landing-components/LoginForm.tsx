import React, { Dispatch, SetStateAction } from 'react'
import { FaGoogle } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";

function LoginForm({ handleLogin, email, setEmail, password, setPassword, setIsForgot, handleLoginWithGoogle }:
    {
        handleLogin: any,
        email: string, setEmail: Dispatch<SetStateAction<string>>,
        password: string, setPassword: Dispatch<SetStateAction<string>>,
        setIsForgot: Dispatch<SetStateAction<boolean>>,
        handleLoginWithGoogle: () => void
    }) {
    return (
        <form className='flex flex-col gap-2 justify-evenly items-center h-[35%] w-[25vw]' onSubmit={(e) => handleLogin(e)}>
            <div className='flex justify-between w-[80%]'>
                <label className='' htmlFor="email">Email:</label>
                <input
                    className='bg-white pl-1 w-50'
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex justify-between w-[80%]'>
                <label className='' htmlFor="password">Password:</label>
                <input
                    className='bg-white pl-1 w-50'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <p className='mt-5 text-xs'>or click
                <span className='font-bold cursor-pointer hover:text-secondary'
                    onClick={() => { setIsForgot(true) }}> here </span>
                if you forgot your password
            </p>
            <div className='flex flex-col gap-3 justify-center mt-8'>
                <button
                    type="submit"
                    className="w-60 cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                    Login
                </button>
                <button
                    onClick={() => handleLoginWithGoogle()}
                    className="flex gap-3 items-center cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent w-60">
                    <img src='/google.png' className='h-6' />
                    Login with Google
                </button>
            </div>
        </form >)
}

export default LoginForm