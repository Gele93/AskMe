import React, { useState } from 'react'
import SetPreview from '../set-components/SetPreview'
import { ActionType, Set } from '../../types/types'
import ActionButton from '../utilities/ActionButton'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Dispatch, SetStateAction } from 'react';
import BigActionButton from '../utilities/BigActionButton';
import ConfirmModal from '../utilities/ConfirmModal';
import ModalWraper from '../utilities/ModalWraper';
import { fetchDeleteSet } from '../../scripts/scripts';
import { ToastType } from '../../types/types';

function SetModal({ set, sets, setSets, setClickedSet, useInfoToast }: { set: Set, sets: Set[] | null, setSets: Dispatch<SetStateAction<Set[] | null>>, setClickedSet: Dispatch<SetStateAction<Set | null>>, useInfoToast: any }) {

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)

    const handleDelete = () => {
        setIsDeleteModal(true)
    }
    const handleDeleteConfirm = async () => {
        if (await fetchDeleteSet(set.id)) {
            useInfoToast(`${set.name} set was deleted successfully!`, ToastType.Ok)
        } else {
            useInfoToast(`Deleting ${set.name} failed`, ToastType.Fail)
        }
        if (sets) {
            let updatedSets = [...sets]
            updatedSets = updatedSets.filter(s => s.id !== set.id)
            setSets(updatedSets)
        }
        setIsDeleteModal(false)
        setClickedSet(null)
    }
    const handleDeleteCancel = () => {
        setIsDeleteModal(false)
    }

    const learnThis = () => {
        console.log("learn")
    }

    const [isDetailedView, setIsDetailedView] = useState<boolean>(true)

    return (
        <ModalWraper>
            <div className='flex flex-col items-center justify-around absolute z-20 w-[55vw] h-[70vh] bg-background rounded-3xl border-secondary border-3 top-[50%] left-[50%] transform translate-[-50%] '>
                <div className='flex justify-between items-center h-[5vh] w-[95%]'>
                    <div>
                        <BigActionButton text={`${isDetailedView ? "Hide" : "Show"} set details`} action={() => setIsDetailedView(!isDetailedView)} />
                    </div>
                    <IoMdCloseCircleOutline
                        onClick={() => setClickedSet(null)}
                        className='text-4xl cursor-pointer hover:text-fail' />
                </div>
                <SetPreview set={set} height='55vh' showDetails={isDetailedView} />
                <div className='flex justify-evenly w-full'>
                    <ActionButton text={"Edit"} action={learnThis} actionType={ActionType.Edit} />
                    <BigActionButton text={"Learn this!"} action={learnThis} />
                    <ActionButton text={"Delete"} action={handleDelete} actionType={ActionType.Delete} />
                </div>
            </div>
            {isDeleteModal &&
                <ModalWraper>
                    <ConfirmModal title={`Delet ${set.name}?`} leftText='Delete' leftAction={handleDeleteConfirm} rightText='Cancel' rightAction={handleDeleteCancel} />
                </ModalWraper>
            }
        </ModalWraper>
    )
}

export default SetModal