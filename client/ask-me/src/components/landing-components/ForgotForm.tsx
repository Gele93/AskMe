import React, { Dispatch, SetStateAction, useState } from 'react'
import { fetchForgotPasswordEmail } from '../../scripts/scripts'
import { ToastType } from '../../types/types'

function ForgotForm({ useInfoToast }: { useInfoToast: any }) {

    const [email, setEmail] = useState<string>("")

    const handleForgot = async (e: any) => {
        e.preventDefault()
        if (await fetchForgotPasswordEmail(email)) {
            useInfoToast(`Password reset email sent to ${email}.`, ToastType.Info)
        } else {
            useInfoToast("Could not send password reset email.", ToastType.Fail)
        }

    }

    return (
        <form className='flex flex-col justify-center items-center h-[100%] w-[25vw]' onSubmit={(e) => handleForgot(e)}>
            <div className='flex justify-between w-[80%] gap-5'>
                <label htmlFor="email">Email:</label>
                <input
                    className='bg-white pl-1 grow'
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex justify-center mt-5'>
                <button
                    type="submit"
                    className="w-70 cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                    Send
                </button>
            </div>
        </form >)
}


export default ForgotForm