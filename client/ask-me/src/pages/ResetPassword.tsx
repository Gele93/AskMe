import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import LandingBanner from '../components/landing-components/LandingBanner'
import LoginPanel from '../components/landing-components/LoginPanel'
import ResetPasswordForm from '../components/reset-password-components/ResetPasswordForm'
import { useNavigate } from 'react-router-dom'
import { FetchValidateNewpwRoute } from '../scripts/scripts'
import { NewPwRoute } from '../types/types'

function ResetPassword({ useInfoToast }: { useInfoToast: any }) {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        const readRouteData = async () => {
            setIsLoading(true)
            const route: NewPwRoute = {
                Token: decodeURIComponent(new URLSearchParams(window.location.search).get('token') || "").replace(/ /g, '+'),
                Email: new URLSearchParams(window.location.search).get('email') || ""
            }

            if (route.Token.length === 0 || route.Email.length === 0)
                navigate("/home")


            if (! await FetchValidateNewpwRoute(route))
                navigate("/home")


            setToken(route.Token)
            setEmail(route.Email)
            setIsLoading(false)
        }

        readRouteData()
    }, [])

    return (
        <>
            {
                isLoading ?
                    <div className='loader'></div>
                    :
                    <div className='w-full h-[100vh] grid grid-rows-[10vh_90vh]'>
                        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center" style={{ backgroundImage: `url('landing-bg.jpg')` }}></div>
                        <section className='flex items-center m-10'>
                            <p className='text-5xl text-accent '></p>
                        </section>
                        <section className='grid grid-cols-[40vw_30vw] gap-20'>
                            <LandingBanner />
                            <section className='grid grid-cols-2 h-[70%] self-center shadow-xl rounded-4xl border-4 border-[#eaf2ea] bg-accent-05 backdrop-blur-xs '>
                                <ResetPasswordForm token={token} email={email} useInfoToast={useInfoToast} />
                            </section>
                        </section>
                    </div>
            }
        </>
    )
}

export default ResetPassword