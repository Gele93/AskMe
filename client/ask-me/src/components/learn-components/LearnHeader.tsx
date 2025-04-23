import React from 'react'
import { FaStopCircle } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { shortenTitle } from '../../scripts/scripts'

function LearnHeader({ setName, username, totalQuestions, currentQuestion }:
    { setName: string | undefined, username: string | undefined, totalQuestions: number, currentQuestion: number }) {

    const handleStop = () => {

    }

    return (
        <div className='flex w-[80%] mx-auto mt-4 mb-4 items-center justify-around rounded-4xl bg-background-50 h-8'>
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
            <div className='flex justify-center items-center'>
                <CgProfile className='mr-2' />
                <p>{username}</p>
            </div>
        </div>
    )
}

export default LearnHeader