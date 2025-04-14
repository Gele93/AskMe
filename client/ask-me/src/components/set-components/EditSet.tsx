import React, { useState } from 'react'
import { Set as SetType } from '../../types/types'
import { BsArrowsAngleExpand } from "react-icons/bs";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import EditSetTheme from './EditSetTheme';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import BigActionButton from '../utilities/BigActionButton';
import { Dispatch, SetStateAction } from 'react';
import { shortenTitle } from '../../scripts/scripts';

function EditSet({ set, sets, setSets, height, setEditSet, useInfoToast, openLearnThisPreset }
    : {
        set: SetType | undefined,
        sets: SetType[] | null, setSets: Dispatch<SetStateAction<SetType[] | null>>,
        height: string,
        showDetails: boolean,
        setEditSet: Dispatch<SetStateAction<SetType | null>>,
        useInfoToast: any
        openLearnThisPreset: (set: SetType | null) => void
    }) {

    const [isFullScreen, setIsFullScren] = useState<boolean>(false)
    const [openedThemeIds, setOpenedThemeIds] = useState<Set<number>>(new Set())

    const handleCompress = (themeId: number) => {
        let updatedThemeIdsArray = [...openedThemeIds]
        updatedThemeIdsArray = updatedThemeIdsArray.filter(tid => tid !== themeId)
        setOpenedThemeIds(new Set(updatedThemeIdsArray))
    }

    const handleExpand = (themeId: number) => {
        let updatedThemeIdsArray = [...openedThemeIds]
        updatedThemeIdsArray.push(themeId)
        setOpenedThemeIds(new Set(updatedThemeIdsArray))
    }

    const learnThis = () => {
        if (set) openLearnThisPreset(set)
    }

    return (
        <div className='bg-background grid grid-rows-[10%_80%_10%] w-[65vw] h-[80vh] rounded-2xl border-2 border-secondary z-50'>
            <div className='w-[65vw] flex justify-between items-center'>
                <p className='ml-10 text-2xl flex-1/3 '>{set?.name}</p>
                <p className='text-gray-700 flex-1/3 '>{shortenTitle(set?.description ?? "", 50)}</p>
                <div className='flex justify-end flex-1/3 '>
                    <IoMdCloseCircleOutline
                        onClick={() => setEditSet(null)}
                        className='text-4xl self-center mr-2 cursor-pointer hover:text-fail' />
                </div>
            </div>
            <div
                className={`flex flex-col bg-secondary w-[60vw] rounded-2xl border-2 border-primary p-5 mx-auto
                ${isFullScreen && "absolute w-[90vw] left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"}
                `}
                style={{ height: isFullScreen ? "90vh" : height }}>
                <div className='flex justify-end relative top-0 right-0'>
                    <BsArrowsAngleExpand
                        className='cursor-pointer transform hover:scale-125 transition duration-300 ease-in-out'
                        onClick={() => setIsFullScren(!isFullScreen)}
                    />
                </div>
                <div className='mt-5 w-[100%] mx-auto pl-10 pr-10 overflow-y-auto indent-scrollbar'>
                    {set?.themes.map((t, i) => (
                        t.questions.length > 0 &&
                        <EditSetTheme
                            index={i} theme={t} openedThemeIds={openedThemeIds} handleCompress={handleCompress} handleExpand={handleExpand}
                            useInfoToast={useInfoToast} set={set} setEditSet={setEditSet} sets={sets} setSets={setSets} />
                    ))}
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <button
                    className='h-10 w-[60%] text-xl rounded-2xl bg-secondary hover:bg-accent cursor-pointer border-2 flex justify-center items-center gap-4'
                    onClick={() => learnThis()}>
                    <p className='text-secondary font-bold text-2xl'>Learn</p>
                    <img src='/plain-logo.png' className='h-full' />
                    <p className='text-secondary font-bold text-2xl'>This</p>
                </button>
            </div>
        </div >
    )
}

export default EditSet