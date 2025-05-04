import React, { useEffect, useState } from 'react'
import { Set } from '../../types/types'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import EditSet from '../set-components/EditSet';
import SetsTable from './SetsTable';
import ModalWraper from '../utilities/ModalWraper';
import BigActionButton from '../utilities/BigActionButton';


function SetsBody({ sets, setSets, useInfoToast, openLearnThisPreset }:
    { sets: Set[], setSets: Dispatch<SetStateAction<Set[]>>, useInfoToast: any, openLearnThisPreset: (set: Set | null) => void }) {

    const [editSet, setEditSet] = useState<Set | null>(null)
    const navigate = useNavigate()

    const handleAddNewSet = () => {
        navigate("/sets/create")
    }

    return (
        <>
            <SetsTable sets={sets} setEditSet={setEditSet} />
            <div className='mx-auto'>
                <BigActionButton text='Create new' action={handleAddNewSet} />
            </div>
            {editSet !== null &&
                <ModalWraper>
                    <EditSet
                        set={editSet} sets={sets} setSets={setSets} setEditSet={setEditSet}
                        height='60vh' showDetails={true} useInfoToast={useInfoToast} openLearnThisPreset={openLearnThisPreset} />
                </ModalWraper>
            }
        </>
    )
}

export default SetsBody