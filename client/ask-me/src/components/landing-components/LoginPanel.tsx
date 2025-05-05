import React from 'react'
import { useState } from 'react';
import { LoginUserDto, User } from '../../types/types';
import { fetchForgotPasswordEmail, fetchLoginUser } from '../../scripts/scripts';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import ForgotForm from './ForgotForm';

function LoginPanel() {

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

    return (
        <div className='flex flex-col justify-center items-center bg-accent-05 backdrop-blur-xs  rounded-l-4xl '>
            {isForgot ?
                <ForgotForm />
                :
                <>
                    <LoginForm handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setIsForgot={setIsForgot}/>
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