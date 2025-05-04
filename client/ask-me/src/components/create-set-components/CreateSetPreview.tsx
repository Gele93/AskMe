import React, { use, useState } from 'react'
import { CreateStage, Set, ToastType } from '../../types/types'
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { fetchCreateSet } from '../../scripts/scripts';
import ConfirmModal from '../utilities/ConfirmModal';
import SetPreview from '../set-components/SetPreview';
import BigActionButton from '../utilities/BigActionButton';
import { useNavigate } from 'react-router-dom';
import ModalWraper from '../utilities/ModalWraper';

function CreateSetPreview({ stage, setStage, set, useInfoToast }:
    {
        stage: CreateStage, setStage: React.Dispatch<React.SetStateAction<CreateStage>>,
        set: Set | undefined,
        useInfoToast: any

    }) {

    const [isSubmited, setIsSubmited] = useState<boolean>(false)
    const [isDetailedView, setIsDetailedView] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (set) {
            try {
                if (await fetchCreateSet(set)) {
                    useInfoToast("Set successfully created!", ToastType.Ok)
                    setIsSubmited(true)
                } else {
                    useInfoToast("Set creation failed", ToastType.Fail)
                }
            }
            catch (error) {
                useInfoToast("Set creation failed", ToastType.Fail)
            }
        }
    }

    const leftSubmitModalAction = () => {
        window.location.reload()
    }
    const rightSubmitModalAction = () => {
        navigate("/dashboard")
    }

    return (
        <>
            <div className='grid grid-cols-[20%_60%_20%] items-center w-[100%] h-[100%]'>
                <button
                    className='border-1 text-3xl cursor-pointer p-4  bg-secondary w-20 rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                    onClick={() => setStage(CreateStage.Details)}>
                    <MdArrowBackIos className='ml-3' />
                </button>
                <div className='flex flex-col items-center gap-4'>
                    <BigActionButton text={`${isDetailedView ? "Hide" : "Show"} set details`} action={() => setIsDetailedView(!isDetailedView)} />
                    <SetPreview set={set} height='70vh' showDetails={isDetailedView} />
                </div>
                <button
                    className='border-1 text-3xl cursor-pointer p-4  bg-secondary w-40 rounded-xl mx-auto hover:bg-primary flex items-center justify-center'
                    onClick={() => handleSubmit()}>
                    Submit
                </button>
            </div>
            {isSubmited &&
                <ModalWraper>
                    <ConfirmModal
                        title='Set created succesfully.'
                        leftText='Add new set'
                        rightText='Back to dashboard'
                        leftAction={leftSubmitModalAction}
                        rightAction={rightSubmitModalAction}
                    />
                </ModalWraper>
            }
        </>
    );
}

export default CreateSetPreview