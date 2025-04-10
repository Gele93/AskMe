import React from 'react'

function BigActionButton({ text, action }: { text: string; action: any }) {
    return (
        <button
            className='h-10 w-50 rounded-2xl bg-secondary hover:bg-accent cursor-pointer border-2'
            onClick={() => action()}>
            {text}
        </button>
    )
}

export default BigActionButton