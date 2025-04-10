import React, { useEffect, useState } from 'react'
import { Set } from '../../types/types'
import { Dispatch, SetStateAction } from 'react'
import { CiEdit } from "react-icons/ci";
import EditSet from '../set-components/EditSet';
import SetsTable from './SetsTable';
import ModalWraper from '../utilities/ModalWraper';


function SetsBody({ sets, setSets, useInfoToast }: { sets: Set[] | null, setSets: Dispatch<SetStateAction<Set[] | null>>, useInfoToast: any }) {

    const [editSet, setEditSet] = useState<Set | null>(null)

    return (
        <>
            <SetsTable sets={sets} setEditSet={setEditSet} />
            {editSet !== null &&
                <ModalWraper>
                    <EditSet set={editSet} sets={sets} setSets={setSets} setEditSet={setEditSet} height='60vh' showDetails={true} useInfoToast={useInfoToast} />
                </ModalWraper>
            }
        </>
    )
}

export default SetsBody