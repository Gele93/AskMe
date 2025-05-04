import React from 'react'

function LandingBanner() {
    return (
        <div className='h-[30%] flex items-center justify-center'>
            <img className='w-[30%] h-[auto] drop-shadow-2xl drop-shadow-accent' src="/plain-logo.png" alt="Logo" />
            <div>
                <p className='text-[8vh] text-gray-800'>Ask me</p>
                <p className='text-[4vh] text-gray-600 '>learn while playing cards</p>
            </div>
        </div>
    )
}

export default LandingBanner