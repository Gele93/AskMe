import React, { Dispatch, SetStateAction, useEffect } from 'react'
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
    const [errorMsgs, setErrorMsgs] = useState<string[]>([])
    const [isPasswordMatching, setIsPasswordMatching] = useState<boolean>(true)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (! await checkValidity()) return

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

    const checkValidity = async (): Promise<boolean> => {
        let updatedErrorMsg = []
        if (!firstName)
            updatedErrorMsg.push("First name is missing");
        if (!lastName)
            updatedErrorMsg.push("Last name is missing");
        if (!email)
            updatedErrorMsg.push("Email is missing");
        if (!username)
            updatedErrorMsg.push("Username is missing");
        if (!password)
            updatedErrorMsg.push("Password is missing");
        if (password !== confirmPassword)
            updatedErrorMsg.push("Passwords are not matching");

        setErrorMsgs(updatedErrorMsg)

        if (updatedErrorMsg) return false
        return true
    }

    useEffect(() => {
        setIsPasswordMatching(confirmPassword === password)
    }, [confirmPassword])


    return (
        <div className='flex flex-col justify-center items-center bg-accent-05 backdrop-blur-xs rounded-r-4xl'>
            <form className='flex flex-col justify-evenly items-center h-[60%] w-[25vw]' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="firstName">First Name:</label>
                    <input
                        className='bg-white pl-1'
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="lastName">Last Name:</label>
                    <input
                        className='bg-white pl-1'
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
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
                    <label className='grow-[0.5]' htmlFor="username">Username:</label>
                    <input
                        className='bg-white pl-1'
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div className='flex justify-between w-[80%]'>
                    <label className='grow-[0.5]' htmlFor="password">Confirm Password:</label>
                    <input
                        className={`${isPasswordMatching ? "bg-white" : "bg-fail"} pl-1`}
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
            {errorMsgs[0] &&
                <div className='absolute text-fail h-20 bottom-[2%]'>
                    {errorMsgs.map(e => (
                        <p className='h-4'>{e}</p>
                    ))}
                </div>
            }
        </div >
    );
}

export default RegisterPanel