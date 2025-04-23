import React, { Dispatch, SetStateAction } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaPlayCircle } from "react-icons/fa";
import { Set } from '../types/types';



function HeaderBar({ title, username, openLearnThisPreset }: { title: string, username: string | undefined, openLearnThisPreset: (set: Set | null) => void }) {

  const handlePlay = () => {
    openLearnThisPreset(null)
  }

  return (
    <div className='flex w-[80%] mx-auto mt-4 mb-4 items-center justify-around rounded-4xl bg-background-50 h-8'>
      <div className='items-center font-semibold'>
        {title}
      </div>
      <div className='flex items-center grow-[0.8] justify-center'>
        <button>
          <FaPlayCircle className="cursor-pointer hover:text-accent text-3xl"
            onClick={() => handlePlay()} />
        </button>
      </div>
      <div className='flex justify-center items-center'>
        <CgProfile className='mr-2' />
        <p>{username}</p>
      </div>
    </div>
  )
}

export default HeaderBar