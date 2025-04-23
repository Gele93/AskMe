import React, { useEffect, useState } from 'react'
import { LearnSetup } from '../../types/types'

function Finish({ setup, score }: { setup: LearnSetup, score: number }) {

    const [won, setWon] = useState<boolean>(false)

    useEffect(() => {
        const maxScore = setup.questions * 100
        const finalPercentage = (score / maxScore) * 100
        setWon(finalPercentage >= setup.goal)
    }, [])

    return (
        <div className={`h-[100%] w-[100%] -z-10 flex flex-col items-center justify-center
        ${won ? "gradient-success-bg" : "gradient-fail-bg"}`}>
            <div className='h-[25vh] flex flex-col justify-between fade-in-up text-center z-50'>
                {won ?
                    <div className='h-[70%] flex flex-col justify-between'>
                        <p className='text-4xl '>Good job!</p>
                        <div>
                            <p>Your goal was: <span className='text-2xl'>{setup.goal}%</span></p>
                            <p>Your final result: <span className='text-2xl'>{(score / (setup.questions * 100)) * 100}%</span></p>
                        </div>
                    </div>
                    :
                    <div className='h-[70%] flex flex-col justify-between'>
                        <p className='text-4xl '>Need more study</p>
                        <div>
                            <p>Your goal was: <span className='text-2xl'>{setup.goal}%</span></p>
                            <p>Your final result: <span className='text-2xl'>{(score / (setup.questions * 100)) * 100}%</span></p>
                        </div>
                    </div>
                }
                <p>Click to get back to the Dashboard</p>
            </div>
        </div>
    )
}

export default Finish