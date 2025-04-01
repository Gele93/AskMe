import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CiMenuBurger, CiLogout } from "react-icons/ci";
import { BsQuestionCircle } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";


function Sidebar() {

    const [isMenuHovered, setIsMenuHovered] = useState(false)

    return (
        <div className="grid grid-rows-[100vh]"
            style={{
                gridTemplateColumns: isMenuHovered ? "10vw 90vw" : "2.5vw 97.5vw",
                transition: "grid-template-columns 0.3s ease-in-out",
            }}>
            <nav className="flex flex-col h-screen bg-background overflow-hidden"
                onMouseOver={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}>
                <Link className="flex justify-around mt-10 pad overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent" to="/dashboard">
                    <div className='flex-1/2 flex justify-start'>
                        <CiMenuBurger />
                    </div>
                    {isMenuHovered &&
                        <p className='flex-1/2'>Dashboard</p>
                    }
                </Link>
                <Link className="flex justify-around overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent" to="/sets">
                    <div className='flex-1/2 flex justify-start'>
                        <FaSitemap />
                    </div>
                    {isMenuHovered &&
                        <p className='flex-1/2'>Sets</p>
                    }
                </Link>
                <Link className="flex justify-around overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent" to="/questions">
                    <div className='flex-1/2 flex justify-start'>
                        <BsQuestionCircle />
                    </div>
                    {isMenuHovered &&
                        <p className='flex-1/2'>Questions</p>
                    }
                </Link>
                <Link className="flex justify-around overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent" to="/profile">
                    <div className='flex-1/2 flex justify-start'>
                        <CgProfile />
                    </div>
                    {isMenuHovered &&
                        <p className='flex-1/2'>Profile</p>
                    }
                </Link>
                <Link className="flex justify-around overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent" to="/profile">
                    <div className='flex-1/2 flex justify-start'>
                        <IoSettingsOutline />
                    </div>
                    {isMenuHovered &&
                        <p className='flex-1/2'>Settings</p>
                    }
                </Link>
                <Link className="flex justify-around overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent" to="/profile">
                    <div className='flex-1/2 flex justify-start'>
                        <CiLogout />
                    </div>
                    {isMenuHovered &&
                        <p className='flex-1/2'>Logout</p>
                    }
                </Link>
            </nav>
            <main className='bg-primary-50 font'>
                <Outlet />
            </main>
        </div>
    )
}

export default Sidebar