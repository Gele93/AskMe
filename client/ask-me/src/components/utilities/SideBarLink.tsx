import React from 'react'
import { Link } from 'react-router-dom'

function SideBarLink({ icon: Icon, isMenuHovered, text, linkTo }: { icon: React.ElementType, isMenuHovered: boolean, text: string, linkTo: string }) {
    return (
        <Link className="flex justify-between pad overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent p-1" to={linkTo}>
            <div className='flex justify-start'>
                <Icon />
            </div>
            {isMenuHovered &&
                <p className='w-[65%]'>{text}</p>
            }
        </Link>)
}

export default SideBarLink