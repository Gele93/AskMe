import React from 'react'
import { CiCircleList } from "react-icons/ci";
import { MdDataObject } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import { FaLayerGroup } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

function SideBanner() {
    return (
        <div className='flex flex-col justify-around h-[90%] my-auto border-l-1 border-accent'>
            <img src="/logo.png" alt="Logo" />
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex items-center justify-evenly text-accent'>
                    <CiCircleList className='text-2xl ' />
                    <p className='w-[80%] '>Create unlimited sets</p>
                </div>
                <div className='flex items-center justify-evenly text-accent'>
                    <MdDataObject className='text-2xl ' />
                    <p className='w-[80%] '>Use your preformated data</p>
                </div>
                <div className='flex items-center justify-evenly text-accent'>
                    <RiRobot3Line className='text-2xl ' />
                    <p className='w-[80%] '>Use our AI tool to apply any kind of data</p>
                </div>
                <div className='flex items-center justify-evenly text-accent'>
                    <FaLayerGroup className='text-2xl ' />
                    <p className='w-[80%] '>Organize your sets of questions into themes</p>
                </div>
                <div className='flex items-center justify-evenly text-accent'>
                    <MdOutlineQuiz className='text-2xl ' />
                    <p className='w-[80%]'>Create customizable quizes for yourself</p>
                </div>
                <div className='flex items-center justify-evenly text-accent'>
                    <TfiWrite className='text-2xl ' />
                    <p className='w-[80%] '>Test your knowledge in different types of tests</p>
                </div>
            </div>
        </div>
    )
}

export default SideBanner