import React from 'react'

function ModalWraper({ children }: { children: React.ReactNode }) {
    return (
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 h-full w-full flex justify-center items-center'>
            {children}
        </div>
    )
}

export default ModalWraper