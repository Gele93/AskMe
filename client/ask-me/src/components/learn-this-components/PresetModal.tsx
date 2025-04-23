import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ModalWraper from '../utilities/ModalWraper'
import { LearnSetup, Priority, Set, SetToLearn, ThemeWithPriority } from '../../types/types'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import SetupForm from './SetupForm'
import { fetchGetSets } from '../../scripts/scripts'
import { useNavigate } from 'react-router-dom'

function PresetModal({ set, setSet, sets, setIsLearnThisPreset, setSetup, setup }:
    {
        set: SetToLearn | null, setSet: Dispatch<SetStateAction<SetToLearn | null>>
        sets: Set[] | undefined
        setIsLearnThisPreset: Dispatch<SetStateAction<boolean>>
        setup: LearnSetup, setSetup: Dispatch<SetStateAction<LearnSetup>>
    }) {

    useEffect(() => {
        if (!set) {
            if (sets) {
                let themesWithPriority: ThemeWithPriority[] = sets[0].themes?.map(t => {
                    return { ...t, priority: Priority.Normal }
                })
                let setWithPriority = { ...sets[0], themes: themesWithPriority }
                setSet(setWithPriority)
            }
        }
    }, [])

    const handleSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (sets) {
            const updatedSet = sets.find(s => s.id === parseInt(e.target.value))
            if (updatedSet) {
                let themesWithPriority: ThemeWithPriority[] = updatedSet.themes?.map(t => {
                    return { ...t, priority: Priority.Normal }
                })
                let setWithPriority = { ...updatedSet, themes: themesWithPriority }
                setSet(setWithPriority)
            }
        }
    }

    const navigate = useNavigate()

    const learnThis = () => {
        navigate("/learn")
        setIsLearnThisPreset(false)
    }

    return (
        <ModalWraper>
            <div className='grid grid-rows-[10%_70%_20%] justify-center w-[40vw] h-[85vh] bg-primary rounded-3xl border-1 shadow-md shadow-black'>
                <section className='flex justify-between items-center w-full] p-2'>
                    <p className='text-2xl text-center w-[70%]'>Set up your learning session</p>
                    <div>
                        <IoMdCloseCircleOutline
                            onClick={() => setIsLearnThisPreset(false)}
                            className='text-4xl self-center cursor-pointer hover:text-fail' />
                    </div>
                </section>
                <section className='flex items-center justify-center w-[40vw]'>
                    <div className='flex flex-col items-center p-5 bg-secondary w-[35vw] h-full rounded-3xl'>
                        <div className='flex justify-between items-center text-xl w-[90%] h-[9.5vh]'>
                            <label htmlFor='sets'>Set</label>
                            <select className='border-b-2 border-accent w-[15vw]' id='sets' value={set?.id} onChange={(e) => handleSetChange(e)}>
                                {sets?.map(s => (
                                    <option key={s.id} value={s.id} >{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <SetupForm set={set} setSet={setSet} setSetup={setSetup} setup={setup} />
                    </div>
                </section>
                <section className='flex justify-center items-center'>
                    <button
                        className='h-22 w-[35vw] text-xl rounded-2xl bg-secondary hover:bg-accent-50 cursor-pointer flex justify-center items-center gap-4'
                        onClick={() => learnThis()}>
                        <img src='/plain-logo.png' className='h-full' />
                    </button>
                </section>
            </div>
        </ModalWraper>
    )
}

export default PresetModal