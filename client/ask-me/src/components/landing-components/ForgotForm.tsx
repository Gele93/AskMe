import React, { Dispatch, SetStateAction, useState } from 'react'
import { fetchForgotPasswordEmail } from '../../scripts/scripts'

function ForgotForm() {

    const [email, setEmail] = useState<string>("")

    const handleForgot = (e: any) => {
        e.preventDefault()
        console.log(email)
        fetchForgotPasswordEmail(email)
    }

    return (
        <form className='flex flex-col justify-evenly items-center h-[35%] w-[25vw]' onSubmit={(e) => handleForgot(e)}>
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
            <div className='flex justify-center mt-5'>
                <button
                    type="submit"
                    className="cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                    Forgot
                </button>
            </div>
        </form >)
}


export default ForgotForm