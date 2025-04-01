import React from 'react'
import { CgProfile } from "react-icons/cg";

function HeaderBar({ title, username }: { title: string, username: string | undefined}) {
  return (
    <div className='flex w-full justify-around rounded-4xl bg-background-50 h-8'>
      <div className='flex grow-[0.9] items-center justify-center'>
        {title}
      </div>
      <div className='flex grow-[0.1] justify-center w-40 items-center'>
        <CgProfile className='m-2' />
        <p>{username}</p>
      </div>
    </div>
  )
}

export default HeaderBar