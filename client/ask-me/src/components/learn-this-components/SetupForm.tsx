import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LearnSetup, Priority, Set, SetToLearn, Theme, ThemeWithPriority } from '../../types/types'
import { shortenTitle } from '../../scripts/scripts'

function SetupForm({ set, setSet, setSetup, setup }:
    { set: SetToLearn | null, setSet: Dispatch<SetStateAction<SetToLearn | null>>, setSetup: Dispatch<SetStateAction<LearnSetup>>, setup: LearnSetup }) {

    const [isPrioritize, setIsPrioritize] = useState<boolean>(false)

    const switchPriorOn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsPrioritize(true)
    }

    const switchPriorOff = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsPrioritize(false)
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>, theme: ThemeWithPriority) => {
        e.preventDefault()
        let updatedTheme = { ...theme }
        let prio: Priority

        switch (e.target.value) {
            case ("0"):
                prio = Priority.Low
                break
            case ("1"):
                prio = Priority.Normal
                break
            case ("2"):
                prio = Priority.High
                break
            default:
                prio = Priority.Normal
        }

        updatedTheme.priority = prio

        if (set?.themes) {
            let updatedThemes = [...set.themes]
            updatedThemes = updatedThemes.map(t => {
                if (t.id === theme.id) {
                    return updatedTheme
                }
                return t
            })

            let updatedSet = { ...set }
            updatedSet.themes = updatedThemes
            setSet(updatedSet)
        }

    }

    const handleNumberOfQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let updatedSetup = { ...setup }
        updatedSetup.questions = parseInt(e.target.value)
        setSetup(updatedSetup)
    }

    const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let updatedSetup = { ...setup }
        updatedSetup.goal = parseInt(e.target.value)
        setSetup(updatedSetup)
    }

    return (
        <form className='flex flex-col gap-3 text-xl w-[90%]'>
            <label className='flex justify-between h-[5vh] items-center'>
                Number of Questions:
                <input className='border-b-2 border-accent w-[15vw]' type="number" name="numberOfQuestions"
                    onChange={(e) => handleNumberOfQuestionsChange(e)} />
            </label>
            <label className='flex justify-between h-[5-vh] items-center'>
                Goal (%):
                <input className='border-b-2 border-accent w-[15vw]' type="number" name="goal"
                    onChange={(e) => handleGoalChange(e)} />
            </label>
            <div className="flex justify-between h-[5vh] items-center">
                <label>
                    Prioritize Themes:
                </label>
                <div className='w-[15vw] flex justify-evenly gap-2'>
                    <button
                        className={`border-1 rounded-xl flex-1/2 border-black  cursor-pointer
                            ${isPrioritize ? "bg-success"
                                :
                                "hover:border-success hover:text-success"}`}
                        onClick={(e) => switchPriorOn(e)}>
                        On
                    </button>
                    <button
                        className={`border-1 rounded-xl flex-1/2 border-black  cursor-pointer
                            ${!isPrioritize ? "bg-fail"
                                :
                                "hover:border-fail hover:text-fail"}`}
                        onClick={(e) => switchPriorOff(e)}>
                        Off
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2 overflow-y-auto h-[23vh] basic-scrollbar mt-2'>
                {isPrioritize &&
                    set?.themes?.map(t => (
                        t.questions.length > 0 &&
                        <div className={`flex justify-between text-xl w-[80%]
                        ${t.priority === Priority.Low && "text-success"}
                        ${t.priority === Priority.High && "text-warning"}
                        `}>
                            <label htmlFor='sets'>{shortenTitle(t.name, 20)}</label>
                            <select className='border-b-2 border-accent w-[10vw]' id='sets' value={t.priority} onChange={(e) => handlePriorityChange(e, t)}>
                                <option className='text-center' value="0">low</option>
                                <option className='text-center' value="1">normal</option>
                                <option className='text-center' value="2">high</option>
                            </select>
                        </div>
                    ))}
            </div>

        </form>
    )
}

export default SetupForm