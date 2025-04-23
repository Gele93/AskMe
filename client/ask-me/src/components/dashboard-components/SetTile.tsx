import React, { useState } from 'react'
import { Theme } from '../../types/types';
import { shortenTitle } from '../../scripts/scripts';
import { Dispatch, SetStateAction } from 'react';
import { Set } from '../../types/types';

function SetTile({ set, setClickedSet }: { set: Set, setClickedSet: Dispatch<SetStateAction<Set | null>> }) {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className='flex flex-col p-4 border border-primary rounded-xl w-[23.5%] h-[16vh] bg-primary-50 hover:bg-secondary hover:shadow-xl cursor-pointer '
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setClickedSet(set)}>
      {isHovered ?
        <div className='h-[14vh] flex flex-col text-[0.8rem] overflow-auto basic-scrollbar px-5'>
          <p className='text-[1.2rem] sticky top-0 left-0 z-10'>Themes</p>
          {set.themes.map(t => (
            <p key={t.id} className='ml-auto'>{t.name}</p>
          ))}
        </div>
        :
        <>
          <p className='text-2xl mb-2'>{shortenTitle(set.name, 20)}</p>
          <p className='text-[0.8rem]'>{shortenTitle(set.description, 80)}</p>
        </>
      }
    </div>
  );
}

export default SetTile