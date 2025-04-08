import React, { useState } from 'react'
import { Theme } from '../../types/types';
import { shortenTitle } from '../../scripts/scripts';

function SetTile({ title, description, themes }: { title: string, description: string, themes: Theme[] }) {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className='flex flex-col p-4 border border-primary rounded-xl w-[30%] bg-primary-50 hover:bg-secondary hover:shadow-xl cursor-pointer h-[18vh]'
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered ?
        <div className='flex flex-col text-[0.8rem] overflow-auto basic-scrollbar px-5'>
          <p className='text-[1.2rem] sticky top-0 left-0 z-10'>Themes</p>
          {themes.map(t => (
            <p key={t.id} className='ml-auto'>{t.name}</p>
          ))}
        </div>
        :
        <>
          <p className='text-2xl mb-2'>{shortenTitle(title, 20)}</p>
          <p className='text-[0.8rem]'>{description}</p>
        </>
      }
    </div>
  );
}

export default SetTile