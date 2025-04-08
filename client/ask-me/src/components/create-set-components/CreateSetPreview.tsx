import React from 'react'
import { CreateStage, Set } from '../../types/types'
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { fetchCreateSet } from '../../scripts/scripts';

function CreateSetPreview({ stage, setStage, set }:
    {
        stage: CreateStage; setStage: React.Dispatch<React.SetStateAction<CreateStage>>
        set: Set | undefined

    }) {

    const handleSubmit = async () => {
        if (set) {
            await fetchCreateSet(set)
        }
    }

    return (
        <div className='grid grid-cols-[20%_60%_20%] items-center w-[100%] h-[100%]'>
            <button
                className='text-3xl cursor-pointer p-4 border-background bg-secondary w-[30%] rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                onClick={() => setStage(CreateStage.Details)}>
                <MdArrowBackIos />
            </button>
            <div className='flex flex-col bg-secondary h-[70vh] w-[50vw] rounded-2xl border-2 border-primary p-5'>
                <div className='ml-10'>{set?.name}</div>
                <div className='ml-10 mt-1 text-gray-400'>{set?.description}</div>
                <div className='mt-5 w-[100%] mx-auto pl-10 pr-10 overflow-y-auto indent-scrollbar'>
                    {set?.themes.map(t => (
                        t.questions.length > 0 &&
                        <div>
                            <p className='sticky top-0 z-10 bg-secondary w-[100%] border-b-4 border-l-4 p-2 border-primary'>{t?.name}</p>
                            {t?.questions.map(q => (
                                <div>
                                    <p className='ml-5 p-1 bg-gradient-to-r from-primary to-secondary'>{q.text}</p>
                                    {q?.answers.map(a => (
                                        <p className='ml-15'>- {a.text}</p>
                                    ))}
                                </div>
                            ))}
                        </div>

                    ))}
                </div>
            </div>
            <button
                className='text-3xl cursor-pointer p-4 border-background bg-secondary w-[60%] rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                onClick={() => handleSubmit()}>
                Submit
            </button>
        </div>
    );
}

export default CreateSetPreview