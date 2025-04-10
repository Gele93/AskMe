import React from 'react'
import { useNavigate } from 'react-router-dom'
import SmallActionButton from './SmallActionButton'
import { ActionType } from '../../types/types'

function ConfirmModal({ title, leftText, leftAction, rightText, rightAction }: { title: string, leftText: string, rightText: string, leftAction: any, rightAction: any }) {
    const navigate = useNavigate()
    return (
        <div className='flex-col flex items-center justify-evenly absolute z-20 w-[30vw] h-[30vh] bg-secondary m-auto rounded-3xl border-3 border-background'>
            <p>{title}</p>
            <div className='flex w-[80%] justify-around'>
                <SmallActionButton text={leftText} action={leftAction} actionType={ActionType.Delete} />
                <SmallActionButton text={rightText} action={rightAction} actionType={ActionType.Create} />
            </div>

        </div>
    )
}

export default ConfirmModal