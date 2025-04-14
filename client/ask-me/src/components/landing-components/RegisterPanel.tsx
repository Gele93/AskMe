import React, { Dispatch, SetStateAction } from 'react'
import { CreateUserDto, ToastType } from '../../types/types'
import { useState } from 'react';
import { fetchRegisterUser } from '../../scripts/scripts';

function RegisterPanel({ useInfoToast, setIsLogin }: { useInfoToast: any, setIsLogin: Dispatch<SetStateAction<boolean>> }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        //TODO: Error handling
        if (password !== confirmPassword) return

        const user: CreateUserDto = {
            firstName,
            lastName,
            email,
            username,
            password,
            subscriptionLevel: 1,
            role: "User"
        }

        if (await fetchRegisterUser(user)) {
            useInfoToast("Registration succeeded", ToastType.Ok)
            setIsLogin(true)
        } else {
            useInfoToast("Registration failed", ToastType.Fail)
        }
    }



    return (
        <div className='flex flex-col justify-center bg-accent-50 rounded-r-4xl'>
            <form className='flex flex-col justify-evenly items-center h-[60%]' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="firstName">First Name:</label>
                    <input
                        className='bg-white'
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="lastName">Last Name:</label>
                    <input
                        className='bg-white'
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
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
                    <label className='grow-[0.5]' htmlFor="username">Username:</label>
                    <input
                        className='bg-white'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="password">Confirm Password:</label>
                    <input
                        className='bg-white'
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-center mt-5'>
                    <button
                        type="submit"
                        className="cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                        Register
                    </button>
                </div>
            </form >
        </div >
    );
}

export default RegisterPanel