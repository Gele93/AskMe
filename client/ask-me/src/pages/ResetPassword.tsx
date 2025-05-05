import React from 'react'
import LandingBanner from '../components/landing-components/LandingBanner'
import LoginPanel from '../components/landing-components/LoginPanel'
import ResetPasswordForm from '../components/reset-password-components/ResetPasswordForm'

function ResetPassword({ useInfoToast }: { useInfoToast: any }) {
    return (
        <div className='w-full h-[100vh] grid grid-rows-[10vh_90vh]'>
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center" style={{ backgroundImage: `url('landing-bg.jpg')` }}></div>
            <section className='flex items-center m-10'>
                <p className='text-5xl text-accent '></p>
            </section>
            <section className='grid grid-cols-[40vw_30vw] gap-20'>
                <LandingBanner />
                <section className='grid grid-cols-2 h-[70%] self-center shadow-xl rounded-4xl border-4 border-[#eaf2ea] bg-accent-05 backdrop-blur-xs '>
                    <ResetPasswordForm />
                </section>
            </section>
        </div>)
}

export default ResetPassword