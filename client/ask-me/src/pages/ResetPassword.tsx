import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import LandingBanner from '../components/landing-components/LandingBanner'
import LoginPanel from '../components/landing-components/LoginPanel'
import ResetPasswordForm from '../components/reset-password-components/ResetPasswordForm'
import { useNavigate } from 'react-router-dom'
import { FetchValidateNewpwRoute } from '../scripts/scripts'
import { NewPwRoute } from '../types/types'
import ModalWraper from '../components/utilities/ModalWraper'
import { MdOutlineDone } from "react-icons/md";

function ResetPassword({ useInfoToast }: { useInfoToast: any }) {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
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
                                <ResetPasswordForm token={token} email={email} useInfoToast={useInfoToast} setIsSuccess={setIsSuccess} />
                            </section>
                        </section>
                        {isSuccess &&
                            <ModalWraper>
                                <div className='flex flex-col items-center w-[20vw] h-[20vh] shadow-xl rounded-4xl border-4 border-[#eaf2ea] bg-success-50 backdrop-blur-xs '>
                                    <div className='w-[100%] h-[14vh] grid grid-cols-[40%_60%] justify-center items-center'>
                                        <MdOutlineDone className='h-[80%] w-[100%] text-secondary' />
                                        <div className='w-[100%] h-[100%] flex flex-col justify-around items-center'>
                                            <p className='text-center text-secondary'>Password updated successfully!</p>
                                        </div>
                                    </div>
                                    <button
                                        className="w-[75%] cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-success"
                                        onClick={()=>navigate("/home")}>
                                        Back to login
                                    </button>
                                </div>
                            </ModalWraper>}
                    </div>
            }
        </>
    )
}

export default ResetPassword