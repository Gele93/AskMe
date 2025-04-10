import React, { useEffect, useState } from 'react'
import { CreateStage, User } from '../../types/types';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function CreateSetToolChooser({ stage, setStage, user, isFormatedData, setIsFormatedData }:
    { stage: CreateStage; setStage: React.Dispatch<React.SetStateAction<CreateStage>>, user: User | null, isFormatedData: boolean | null, setIsFormatedData: React.Dispatch<React.SetStateAction<boolean | null>> }) {

    const [canUseAi, setCanUseAi] = useState<boolean>(true)
    const [isManual, setIsManual] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const updatedCanUseAi = user.subscriptionLevel > 1
            setCanUseAi(updatedCanUseAi)
        }
    }, [user])

    const handleManualChoice = () => {
        setIsManual(true)
        setIsFormatedData(null)
    }

    const handleFormatedChoice = () => {
        setIsFormatedData(true)
        setIsManual(false)
    }

    const handleUnformatedChoice = () => {
        if (canUseAi) {
            setIsFormatedData(false)
            setIsManual(false)
        }
    }

    const handleNextClick = () => {
        if (isManual) return navigate("/sets/create/manual")
        if (isFormatedData !== null) setStage(CreateStage.Details)
    }

    return (
        <div className='grid grid-cols-[80%_20%] items-center w-[100%] h-[100%]'>
            <div className='h-[60%] border-background rounded-3xl bg-secondary grid grid-cols-3'>
                <button
                    onClick={() => handleManualChoice()}
                    className={`grid grid-rows-[10%_70%] gap-5 rounded-l-3xl cursor-pointer hover:shadow-2xl border-r-2 border-primary-50 
                    ${isManual === true ? "shadow-2xl bg-primary transform scale-[1.05]" : null} transition duration-500 ease-in-out `}>
                    <p className={` ${isManual === true ? "bg-secondary-50" : "bg-primary-50"} text-2xl transition duration-500 ease-in-out`}>
                        Create set <span className=' font-bold'>Manually</span>
                    </p>
                    <div className='flex flex-col justify-center'>
                        <ul >
                            <li className='m-2'>Create your set from <span className='text-accent font-bold'>scratch</span></li>
                        </ul>
                    </div>
                </button>
                <button
                    onClick={() => handleFormatedChoice()}
                    className={`grid grid-rows-[10%_70%] gap-5 rounded-l-3xl cursor-pointer hover:shadow-2xl border-r-2 border-primary-50 
                    ${isFormatedData === true ? "shadow-2xl bg-primary transform scale-[1.05]" : null} transition duration-500 ease-in-out `}>
                    <p className={` ${isFormatedData === true ? "bg-secondary-50" : "bg-primary-50"} text-2xl transition duration-500 ease-in-out`}>
                        Use my <span className=' font-bold'>Formated</span> data
                    </p>
                    <div className='flex flex-col justify-center'>
                        <ul >
                            <li className='m-2'>The file holds data for <span className='text-accent font-bold'>1</span> set</li>
                            <li className='m-2'>Themes marked with <span className='text-accent font-bold'>##</span> </li>
                            <li className='m-2'>Questions marked with <span className='text-accent font-bold'>#</span> </li>
                            <li className='m-2'>Answers marked with <span className='text-accent font-bold'>-</span> or  <span className='text-accent font-bold'>nothing</span> </li>
                        </ul>
                    </div>
                </button>
                <button
                    onClick={() => handleUnformatedChoice()}
                    className={`grid ${canUseAi ? "grid-rows-[10%_70%]" : "grid-rows-[10%_60%_10%]"} gap-5 rounded-r-3xl cursor-pointer hover:shadow-2xl border-l-2 border-primary-50 
                        ${isFormatedData === false ? "shadow-2xl bg-primary transform scale-[1.05]" : null} transition duration-500 ease-in-out 
                        ${!canUseAi && "bg-gray-500 "}`}>
                    <p className={` ${isFormatedData === false ? "bg-secondary-50" : "bg-primary-50"} text-2xl transition duration-500 ease-in-out`}>
                        Use my <span className='font-bold'>Unformated</span> data
                    </p>
                    <div className='flex flex-col justify-center'>
                        <ul >
                            <li className='m-2'>The file holds data for <span className='text-accent font-bold'>1</span> set</li>
                            <li className='m-2'>Themes marked with <span className='text-accent font-bold'>anything</span> </li>
                            <li className='m-2'>Questions marked with <span className='text-accent font-bold'>anything</span> </li>
                            <li className='m-2'>Answers marked with <span className='text-accent font-bold'>anything</span> </li>
                        </ul>
                    </div>
                    {!canUseAi &&
                        <p className='w-[70%] mx-auto text-accent'>upgrade your subscription to use this feature!</p>
                    }
                </button>
            </div>
            <button
                className='border-1 text-3xl cursor-pointer p-4 bg-secondary w-20 rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                onClick={() => handleNextClick()}>
                <MdArrowForwardIos />
            </button>
        </div >
    )
}

export default CreateSetToolChooser