import React from 'react'
import { ActionType } from '../../types/types';

function ActionButton({ text, action, actionType }: { text: string; action: any, actionType: ActionType }) {
    return (
        <button
            className={`h-10 w-30 rounded-2xl bg-secondary cursor-pointer border-2 shadow-md shadow-black
                        ${actionType == ActionType.Create && "hover:bg-success"}
                        ${actionType == ActionType.Edit && "hover:bg-warning"}
                        ${actionType == ActionType.Delete && "hover:bg-fail"}
                        ${actionType == ActionType.Neutral && "hover:bg-background"}`}
            onClick={() => action()}>
            {text}
        </button>
    )
}

export default ActionButton