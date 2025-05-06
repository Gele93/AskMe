import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingBanner() {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate("/home")}
            className='h-[30%] flex items-center justify-center cursor-pointer'>
            <img className='w-[30%] h-[auto] drop-shadow-2xl drop-shadow-accent' src="/plain-logo.png" alt="Logo" />
            <div>
                <p className='h-[8vh] text-[8vh] text-gray-800'>AskMe</p>
                <p className='text-[4vh] text-gray-600 '>learn while playing cards</p>
            </div>
        </div>
    )
}

export default LandingBanner