import React, { Dispatch, SetStateAction } from 'react'
import { FaStopCircle } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { shortenTitle } from '../../scripts/scripts'

function LearnHeader({ setName, username, totalQuestions, currentQuestion, setIsConfirmExit }:
    { setName: string | undefined, username: string | undefined, totalQuestions: number, currentQuestion: number, setIsConfirmExit: Dispatch<SetStateAction<boolean>> }) {

    const handleStop = () => {
        setIsConfirmExit(true)
    }

    return (
        <div className='absolute left-1/2 -translate-x-1/2 flex w-[80%] mt-4 mb-4 items-center justify-around rounded-4xl bg-background-50 h-8 z-20'>
            <div className='flex justify-between w-[15%] items-center font-semibold'>
                {shortenTitle(setName ?? "", 13)}
                <p>{currentQuestion}/{totalQuestions}</p>
            </div>
            <div className='flex items-center grow-[0.8] justify-center'>
                <button>
                    <FaStopCircle className="cursor-pointer hover:text-accent text-3xl"
                        onClick={() => handleStop()} />
                </button>
            </div>
            <div className='w-[15%] flex justify-center items-center'>
                <CgProfile className='mr-2' />
                <p>{username}</p>
            </div>
        </div>
    )
}

export default LearnHeader