import React from 'react'
import { ActionType } from '../../types/types';

function SmallActionButton({ text, action, actionType }: { text: string; action: any, actionType: ActionType }) {
    return (
        <button
            className={`border-1 p-1 rounded-2xl w-[10vw] cursor-pointer
                        ${actionType == ActionType.Create && "hover:bg-success"}
                        ${actionType == ActionType.Edit && "hover:bg-warning"}
                        ${actionType == ActionType.Delete && "hover:bg-fail"}
                        ${actionType == ActionType.Neutral && "hover:bg-background"}`}
            onClick={() => action()}>
            {text}
        </button>
    )
}

export default SmallActionButton