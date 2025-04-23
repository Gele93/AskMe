import React, { useState, Dispatch, SetStateAction } from 'react'
import { Theme, ToastType, Set as SetType } from '../../types/types'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import EditSetQuestion from './EditSetQuestion'
import { MdOutlineDelete, MdOutlineModeEdit, MdOutlineSave, MdOutlineCancel } from "react-icons/md";
import ConfirmModal from '../utilities/ConfirmModal';
import ModalWraper from '../utilities/ModalWraper';
import { fetchDeleteTheme, fetchUpdateTheme } from '../../scripts/scripts';

function EditSetTheme({ index, theme, openedThemeIds, handleCompress, handleExpand, useInfoToast, set, setEditSet, sets, setSets }
    : {
        index: number, theme: Theme, openedThemeIds: Set<number>, handleCompress: any, handleExpand: any, useInfoToast: any, set: SetType,
        setEditSet: Dispatch<SetStateAction<SetType | null>>, sets: SetType[] | null, setSets: Dispatch<SetStateAction<SetType[] | null>>
    }) {

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [updatedTheme, setUpDatedTheme] = useState<Theme>(theme)
    const [isSaveConfirm, setIsSaveConfirm] = useState<boolean>(false)
    const [isDeleteConfirm, setIsDeleteConfirm] = useState<boolean>(false)
    const [isDeleteHovered, setIsDeleteHovered] = useState<boolean>(false)

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsEdit(true)
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDeleteConfirm(true)
    }
    const handleDeleteConfirm = async () => {
        if (await fetchDeleteTheme(theme.id)) {
            const updatedThemes = set.themes.filter(t => t.id !== theme.id)
            const updatedSet = { ...set, themes: updatedThemes }
            setEditSet(updatedSet)

            if (sets) {
                let updatedSets = [...sets]
                updatedSets = updatedSets.map(s => s.id === updatedSet.id ? updatedSet : s)
                setSets(updatedSets)
            }

            useInfoToast(`${theme.name} is deleted`, ToastType.Info)
        } else {
            useInfoToast(`Deletion failed`, ToastType.Fail)
        }
        setIsDeleteConfirm(false)
    }

    const handleSaveClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsSaveConfirm(true)
    }
    const handleSaveConfirm = async () => {
        setIsEdit(false)
        setIsSaveConfirm(false)
        if (await fetchUpdateTheme(updatedTheme)) {
            let updatedSet = { ...set }
            updatedSet.themes = updatedSet.themes.map(t => t.id === updatedTheme.id ? updatedTheme : t)
            if (sets) {
                let updatedSets = [...sets]
                updatedSets = updatedSets.map(s => s.id === updatedSet.id ? updatedSet : s)
                setSets(updatedSets)
            }
            useInfoToast(`${theme.name} updated successfully`, ToastType.Ok)
        } else {
            useInfoToast(`failed to update ${theme.name}`, ToastType.Fail)
        }
    }

    const handleCancelClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setUpDatedTheme(theme)
        setIsEdit(false)
    }

    const handleThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let toUpdateTheme = { ...updatedTheme }
        toUpdateTheme.name = e.target.value
        setUpDatedTheme(toUpdateTheme)
    }
    const handleThemeDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let toUpdateTheme = { ...updatedTheme }
        toUpdateTheme.description = e.target.value
        setUpDatedTheme(toUpdateTheme)
    }

    return (
        <>
            <div key={`t${index}`} className={`${isDeleteHovered && "text-fail"}`}>
                <div
                    className={`sticky flex justify-between top-0 z-10  w-[100%] border-b-4 border-l-4 p-2 border-primary cursor-pointer hover:border-accent
                    ${openedThemeIds.has(theme.id) ? "bg-primary" : "bg-secondary"}`}
                    onClick={openedThemeIds.has(theme.id) ? () => handleCompress(theme.id) : () => handleExpand(theme.id)}>
                    {isEdit ?
                        <div className='flex gap-4 grow'>
                            <input type='text' defaultValue={updatedTheme?.name}
                                placeholder='name'
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleThemeNameChange(e)}
                                className='bg-gray-100 outline-1 text-center rounded-md' />

                            <input type='text' defaultValue={updatedTheme?.description}
                                placeholder='description'
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleThemeDescriptionChange(e)}
                                className="bg-gray-100 outline-1 text-center rounded-md grow-[0.95]" />

                        </div>
                        :
                        <div className='flex gap-4 items-center'>
                            <p className='font-bold'>
                                {updatedTheme?.name}
                            </p>
                            <p className='text-gray-800 font-light text-sm'>
                                {updatedTheme?.description && updatedTheme.description}
                            </p>
                        </div>
                    }
                    <div className='flex items-center gap-4 text-xl'>
                        <div className='h-full flex items-center justify-center '>
                            {isEdit ?
                                <div className='flex justify-between gap-2'>
                                    <MdOutlineSave onClick={(e) => handleSaveClick(e)} className='hover:text-success' />
                                    <MdOutlineCancel onClick={(e) => handleCancelClick(e)} className='hover:text-fail' />
                                </div>
                                :
                                <MdOutlineModeEdit onClick={(e) => handleEditClick(e)} className='hover:text-warning' />
                            }
                        </div>
                        <div className='h-full flex items-center justify-center hover:text-fail'>
                            <MdOutlineDelete
                                onClick={(e) => handleDeleteClick(e)}
                                onMouseOver={() => setIsDeleteHovered(true)}
                                onMouseLeave={() => setIsDeleteHovered(false)}
                            />
                        </div>
                        <div className='h-full flex items-center justify-center '>
                            {openedThemeIds.has(theme.id) ? <MdExpandLess /> : <MdExpandMore />}
                        </div>
                    </div>
                </div>
                {openedThemeIds.has(theme.id) &&
                    updatedTheme?.questions.map((q, j) => (
                        <EditSetQuestion index={j} question={q} isEdit={isEdit} updatedTheme={updatedTheme} setUpdatedTheme={setUpDatedTheme} />
                    ))
                }
            </div >
            {isSaveConfirm &&
                <ModalWraper>
                    <ConfirmModal
                        title={`Save changes on ${theme.name}?`}
                        rightText='Save'
                        rightAction={() => handleSaveConfirm()}
                        leftText='Cancel'
                        leftAction={() => setIsSaveConfirm(false)}
                    />
                </ModalWraper>
            }
            {
                isDeleteConfirm &&
                <ModalWraper>
                    <ConfirmModal
                        title={`Delete ${theme.name}?`}
                        rightText='Cancel'
                        rightAction={() => setIsDeleteConfirm(false)}
                        leftText='Delete'
                        leftAction={() => handleDeleteConfirm()}
                    />
                </ModalWraper>
            }
        </>
    )
}

export default EditSetTheme