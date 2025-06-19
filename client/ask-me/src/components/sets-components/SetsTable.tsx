import React, { Dispatch, SetStateAction, useState } from 'react'
import { Set } from '../../types/types'
import { MdDeleteOutline } from "react-icons/md";
import SetDeleteModal from './SetDeleteModal';

function SetsTable({ sets, setSets, setEditSet, useInfoToast }:
    { sets: Set[] | null, setSets: Dispatch<SetStateAction<Set | null>>, setEditSet: Dispatch<SetStateAction<Set | null>>, useInfoToast: any }) {
    const [hoverId, setHoverId] = useState<number>(0)
    const [deleteHoverId, setDeleteHoverId] = useState<number>(0)
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
    const [deleteSet, setDeleteSet] = useState<Set | null>(null)

    const handleDeleteClick = (e: any, deleteId: number) => {
        e.stopPropagation()
        if (sets != null) {
            const setToDelete = sets.find(s => s.id === deleteId)
            if (setToDelete)
                setDeleteSet(setToDelete)
        }
        setIsDeleteModal(true)
    }

    return (
        <>
            <table className={`w-[80%] mx-auto bg-secondary text-left`}>
                <thead className='bg-primary'>
                    <tr className=''>
                        <th className='p-2 rounded-tl-3xl text-center'>Name</th>
                        <th className='p-2 text-center'>Description</th>
                        <th className='p-2 text-center'>Themes</th>
                        <th className='p-2 rounded-tr-3xl'></th>
                    </tr>
                </thead>
                <tbody >
                    {sets?.map(s => (
                        <tr
                            key={s.id}
                            className={`w-full cursor-pointer
                        ${deleteHoverId === s.id ? "bg-fail-50" : hoverId == s.id ? "bg-primary-50" : "bg-secondary"}`}
                            onMouseOver={() => setHoverId(s.id)}
                            onMouseLeave={() => setHoverId(0)}
                            onClick={() => setEditSet(s)}>
                            <td className='p-1 text-center'>{s.name}</td>
                            <td className='p-1 text-center'>{s.description}</td>
                            <td className='p-1 text-center'>{s.themes.length}</td>
                            <td className='p-1 w-10'
                                onMouseOver={() => setDeleteHoverId(s.id)}
                                onMouseLeave={() => setDeleteHoverId(0)}
                                onClick={(e) => handleDeleteClick(e, s.id)}>
                                <MdDeleteOutline />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                isDeleteModal &&
                <SetDeleteModal deleteSet={deleteSet} setIsDeleteModal={setIsDeleteModal} useInfoToast={useInfoToast} setSets={setSets} sets={sets} />
            }
        </>
    )
}

export default SetsTable