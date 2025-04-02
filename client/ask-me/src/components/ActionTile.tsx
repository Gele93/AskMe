import React from 'react'
import { RiFolderAddFill } from 'react-icons/ri';

function ActionTile({ icon: Icon, title, subTitle, action }: { icon: React.ElementType; title: string, subTitle: string, action: void | any }) {
    return (
        <div
            className='flex flex-col p-4 border border-primary rounded-xl w-[30%] bg-primary hover:bg-secondary hover:shadow-xl  cursor-pointer h-[18vh]'
            onClick={() => action()}>
            <div className='flex justify-around text-[1.2rem]'>
                <p className='grow-[0.5]'>{title}</p>
                <Icon />
            </div>
            <p className='text-[0.8rem]'>{subTitle}</p>
        </div>
    );
}

export default ActionTile