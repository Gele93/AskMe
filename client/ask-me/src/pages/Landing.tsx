import React, { useState } from 'react'
import LoginPanel from '../components/landing-components/LoginPanel'
import RegisterPanel from '../components/landing-components/RegisterPanel'
import LandingBanner from '../components/landing-components/LandingBanner'

function Landing() {

    const [isLogin, setIsLogin] = useState(false)

    return (
        <div className='bg-[#eaf2ea] w-full h-[100vh] grid grid-rows-[10vh_90vh]'>
            <section className='flex items-center m-10'>
                <p className='text-5xl text-accent '></p>
            </section>
            <section className='grid grid-cols-[40vw_50vw] gap-20'>
                <LandingBanner />
                <section className='grid grid-cols-2 h-[70%] self-center shadow-xl rounded-4xl'>
                    {isLogin ?
                        <LoginPanel />
                        :
                        <section className='bg-accent rounded-l-4xl flex items-center justify-center'>
                            <button className='text-3xl text-secondary cursor-pointer' onClick={() => setIsLogin(!isLogin)}>Login</button>
                        </section>
                    }
                    {isLogin ?
                        <section className='bg-accent rounded-r-4xl flex items-center justify-center'>
                            <button className='text-3xl text-secondary cursor-pointer' onClick={() => setIsLogin(!isLogin)}>Register</button>
                        </section>
                        :
                        <RegisterPanel />
                    }

                </section>
            </section>
        </div>
    )
}

export default Landing