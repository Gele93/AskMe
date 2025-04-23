import React, { useEffect, useState } from 'react'
import LoginPanel from '../components/landing-components/LoginPanel'
import RegisterPanel from '../components/landing-components/RegisterPanel'
import LandingBanner from '../components/landing-components/LandingBanner'
import { checkAuthorization } from '../scripts/scripts'
import { useNavigate } from 'react-router-dom'

function Landing({ useInfoToast }: { useInfoToast: any }) {

    const [isLogin, setIsLogin] = useState<boolean>(false)
    const navigate = useNavigate()


    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuthorization()
            console.log(result)
            if (result) navigate("/dashboard")
        };
        verifyAuth();
    }, [navigate]);

    return (
        <div className='bg-[#eaf2ea] w-full h-[100vh] grid grid-rows-[10vh_90vh]'>
            <section className='flex items-center m-10'>
                <p className='text-5xl text-accent '></p>
            </section>
            <section className='grid grid-cols-[40vw_50vw] gap-20'>
                <LandingBanner />
                <section className='grid grid-cols-2 h-[70%] self-center shadow-xl rounded-4xl border-4 border-[#eaf2ea]  '>
                    {isLogin ?
                        <LoginPanel />
                        :
                        <section className='bg-accent rounded-l-4xl flex items-center justify-center cursor-pointer shadow-md shadow-black'
                            onClick={() => setIsLogin(!isLogin)}>
                            <button className='text-3xl text-secondary'>Login</button>
                        </section>
                    }
                    {isLogin ?
                        <section className='bg-accent rounded-r-4xl flex items-center justify-center cursor-pointer shadow-md shadow-black'
                            onClick={() => setIsLogin(!isLogin)}>
                            <button className='text-3xl text-secondary' >Register</button>
                        </section>
                        :
                        <RegisterPanel useInfoToast={useInfoToast} setIsLogin={setIsLogin} />
                    }

                </section>
            </section>
        </div>
    )
}

export default Landing