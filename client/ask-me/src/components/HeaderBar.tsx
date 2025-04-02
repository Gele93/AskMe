import React from 'react'
import { CgProfile } from "react-icons/cg";
import ActionButton from './ActionButton';
import { IoIosAddCircle } from "react-icons/io";


function HeaderBar({ title, username }: { title: string, username: string | undefined }) {

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  return (
    <div className='flex w-[80%] mx-auto mt-4 mb-4 items-center justify-around rounded-4xl bg-background-50 h-8'>
      <div className='items-center font-semibold'>
        {title}
      </div>
      <div className='flex items-center grow-[0.8] justify-center'>
        <button>
          <IoIosAddCircle className="cursor-pointer hover:text-accent text-3xl" />
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