import React from 'react'
import { useState } from 'react';
import { LoginUserDto, User } from '../../types/types';
import { fetchForgotPasswordEmail, fetchLoginUser } from '../../scripts/scripts';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import ForgotForm from './ForgotForm';

function LoginPanel({ useInfoToast }: { useInfoToast: any }) {

    const [isForgot, setIsForgot] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsgs, setErrorMsgs] = useState<string[]>([])
    const navigate = useNavigate();


    const handleLogin = async (e: any) => {
        e.preventDefault()
        checkValidity()

        const loginUser: LoginUserDto = {
            email,
            password
        }
        const logedInUser: User = await fetchLoginUser(loginUser)
        localStorage.setItem("user", JSON.stringify(logedInUser))
        navigate("/dashboard");
    }

    const checkValidity = () => {
        let updatedErrorMsg = []
        if (!email)
            updatedErrorMsg.push("email is missing")
        if (!password)
            updatedErrorMsg.push("password is missing")
        setErrorMsgs(updatedErrorMsg)
    }

    const handleLoginWithGoogle = () => {
        const url = "/api/user/signin-google"
        window.location.href = url
    }

    return (
        <div className='flex flex-col justify-evenly items-center bg-accent-05 backdrop-blur-xs  rounded-l-4xl '>
            {isForgot ?
                <>
                    <p className='absolute top-10 text-xs'>Enter your email to receive the link to reset your password</p>
                    <ForgotForm useInfoToast={useInfoToast} />
                    <button
                        onClick={() => setIsForgot(false)}
                        className="absolute bottom-10 cursor-pointer rounded-4xl border px-8 hover:border-secondary hover:text-secondary hover:bg-accent">
                        Back
                    </button>
                </>
                :
                <>
                    <LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setIsForgot={setIsForgot} handleLoginWithGoogle={handleLoginWithGoogle} />
                    {errorMsgs[0] &&
                        <div className='absolute text-fail h-20 bottom-[10%]'>
                            {errorMsgs.map(e => (
                                <p>{e}</p>
                            ))}
                        </div>
                    }
                </>
            }
        </div >
    );
}

export default LoginPanel