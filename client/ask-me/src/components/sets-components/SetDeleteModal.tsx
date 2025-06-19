import React, { Dispatch, SetStateAction } from 'react'
import ModalWraper from '../utilities/ModalWraper'
import ConfirmModal from '../utilities/ConfirmModal'
import { Set, ToastType } from '../../types/types'
import { fetchDeleteSet } from '../../scripts/scripts'

function SetDeleteModal({ deleteSet, setIsDeleteModal, useInfoToast, sets, setSets }:
    { deleteSet: Set | null, setIsDeleteModal: Dispatch<SetStateAction<boolean>>, useInfoToast: any, sets: Set[] | null, setSets: Dispatch<SetStateAction<Set[] | null>> }) {
    const handleDeletion = async (deleteId: number) => {
        if (await fetchDeleteSet(deleteId)) {
            setIsDeleteModal(false)
            if (sets) {
                const updatedSets = [...sets.filter(s => s.id != deleteId)]
                setSets(updatedSets)
            }
            useInfoToast(`${deleteSet?.name} was deleted successfully`, ToastType.Ok)
        } else {
            setIsDeleteModal(false)
            useInfoToast(`Deleting ${deleteSet?.name} failed`, ToastType.Fail)
        }
    }
    return (
        <ModalWraper>
            <ConfirmModal
                title={`Would you like to delete ${deleteSet?.name}`}
                leftText='Delete'
                leftAction={() => deleteSet && handleDeletion(deleteSet.id)}
                rightText='Cancel'
                rightAction={() => setIsDeleteModal(false)} />
        </ModalWraper>
    )
}

export default SetDeleteModal