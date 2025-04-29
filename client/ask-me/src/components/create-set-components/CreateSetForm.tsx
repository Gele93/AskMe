import React from 'react'
import { CreateStage, Set, ToastType } from '../../types/types';
import { useState } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { RxValue } from 'react-icons/rx';
import { fetchCreateSetPreview } from '../../scripts/scripts';

function CreateSetForm({ stage, setStage, name, setName, description, setDescription, file, setFile, isFormatedData, set, setSet, useInfoToast }:
    {
        stage: CreateStage; setStage: React.Dispatch<React.SetStateAction<CreateStage>>
        name: string, setName: React.Dispatch<React.SetStateAction<string>>
        description: string, setDescription: React.Dispatch<React.SetStateAction<string>>
        file: any | null, setFile: React.Dispatch<React.SetStateAction<any | null>>
        isFormatedData: boolean | null
        set: Set | undefined, setSet: React.Dispatch<React.SetStateAction<Set | undefined>>,
        useInfoToast: any
    }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleNextClick = async () => {
        setIsLoading(true)
        try {
            const setPreview: Set | undefined = await fetchCreateSetPreview(name, description, file, isFormatedData)
            setSet(setPreview)
            setStage(CreateStage.Preview)
            setIsLoading(false)
        } catch (error) {
            useInfoToast("Could not create set preview", ToastType.Fail)
        }

    }

    return (
        <>
            <div className='grid grid-cols-[23%_54%_23%] items-center w-[100%] h-[100%]'>
                <button
                    className='text-3xl border-1 cursor-pointer p-4 bg-secondary w-20 rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                    onClick={() => setStage(CreateStage.Tool)}>
                    <MdArrowBackIos className='ml-3' />
                </button>
                <form className=" flex flex-col justify-around gap-4 p-4 items-center border h-[80%] w-[60%] mx-auto border-background rounded-3xl bg-secondary">
                    <p className='text-xl font-bold'>Set details</p>
                    <div>
                        <label className="flex flex-col w-[100%]">
                            <span className="text-lg font-semibold">Name</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="p-2 border rounded-md"
                                placeholder="Enter name"
                            />
                        </label>
                        <label className="flex flex-col w-[100%]">
                            <span className="text-lg font-semibold">Description</span>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-2 border rounded-md"
                                placeholder="Enter description"
                                rows={4}
                            />
                        </label>
                        <label className="flex flex-col w-[100%]">
                            <span className="text-lg font-semibold">Upload File</span>
                            <input
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                type="file"
                                className="p-2 border rounded-md"
                            />
                        </label>
                    </div>
                </form>
                <button
                    className='border-1 text-3xl cursor-pointer p-4 bg-secondary w-20 rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                    onClick={() => handleNextClick()}>
                    <MdArrowForwardIos />
                </button>
            </div >
            {isLoading &&
                <div className='text-accent text-xl flex flex-col absolute bottom-16'>
                    <p>We are processing your data, please wait!</p>
                    <div className='upload-loader'></div>
                </div>
            }
        </>
    )
}

export default CreateSetForm