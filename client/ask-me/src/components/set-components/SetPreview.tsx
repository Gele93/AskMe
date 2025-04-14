import React, { useState } from 'react'
import { Set } from '../../types/types'
import { BsArrowsAngleExpand } from "react-icons/bs";

function SetPreview({ set, height, showDetails }: { set: Set | undefined, height: string, showDetails: boolean }) {

    const [isFullScreen, setIsFullScren] = useState<boolean>(false)

    return (
        <div
            className={`flex flex-col bg-secondary w-[50vw] rounded-2xl border-2 border-primary p-5
        ${isFullScreen && "absolute w-[90vw] left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"}
        `}
            style={{ height: isFullScreen ? "90vh" : height }}>
            <div className='flex justify-end relative top-0 right-0'>
                <BsArrowsAngleExpand
                    className='cursor-pointer transform hover:scale-125 transition duration-300 ease-in-out'
                    onClick={() => setIsFullScren(!isFullScreen)}
                />
            </div>
            <div className='ml-10'>{set?.name}</div>
            <div className='ml-10 mt-1 text-gray-400'>{set?.description}</div>
            <div className='mt-5 w-[100%] mx-auto pl-10 pr-10 overflow-y-auto indent-scrollbar'>
                {set?.themes.map((t, i) => (
                    t.questions.length > 0 &&
                    <div key={`t${i}`}>
                        <p className='sticky top-0 z-10 bg-secondary w-[100%] border-b-4 border-l-4 p-2 border-primary font-bold'>{t?.name}</p>
                        {showDetails &&
                            t?.questions.map((q, j) => (
                                <div key={`q${j}`}>
                                    <p className='ml-5 p-1 bg-gradient-to-r from-primary to-secondary'>{q.text}</p>
                                    {q?.answers.map((a, k) => (
                                        <p key={`a${k}`} className='ml-15 font-light'>- {a.text}</p>
                                    ))}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SetPreview