import React, { Dispatch, SetStateAction } from 'react'

function LoginForm({ handleLogin, email, setEmail, password, setPassword, setIsForgot }:
    {
        handleLogin: any,
        email: string, setEmail: Dispatch<SetStateAction<string>>,
        password: string, setPassword: Dispatch<SetStateAction<string>>,
        setIsForgot: Dispatch<SetStateAction<boolean>>
    }) {
    return (
        <form className='flex flex-col justify-evenly items-center h-[35%] w-[25vw]' onSubmit={(e) => handleLogin(e)}>
            <div className='flex justify-between w-[80%]'>
                <label className='grow-[0.5]' htmlFor="email">Email:</label>
                <input
                    className='bg-white pl-1'
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex justify-between w-[80%]'>
                <label className='grow-[0.5]' htmlFor="password">Password:</label>
                <input
                    className='bg-white pl-1'
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <p className='text-xs'>or click
                <span className='font-bold cursor-pointer hover:text-secondary'
                    onClick={() => { setIsForgot(true) }}> here </span>
                if you forgot your password
            </p>
            <div className='flex justify-center mt-5'>
                <button
                    type="submit"
                    className="cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                    Login
                </button>
            </div>
        </form >)
}

export default LoginForm