import React, { useEffect, useState } from 'react'

function ResetPasswordForm() {

    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isPasswordMatching, setIsPasswordMatching] = useState<boolean>(true)
    const [token, setToken] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        const readToken: string = new URLSearchParams(window.location.search).get('token') || "";
        const readEmail: string = new URLSearchParams(window.location.search).get('email') || "";
        setToken(readToken)
        setEmail(readEmail)
    }, [])


    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className='w-[30vw] flex flex-col justify-around items-center rounded-4xl'>
            <p className='text-xl'>Create new password</p>
            <form className='flex flex-col justify-evenly items-center h-[60%] w-[25vw]' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex-col flex justify-between h-[10vh] w-[30vw] items-center'>
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
                </div>
                <div className='flex justify-center mt-5'>
                    <button
                        type="submit"
                        className="cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                        Update password
                    </button>
                </div>
            </form >
        </div >
    )
}

export default ResetPasswordForm