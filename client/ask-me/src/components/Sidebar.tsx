import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CiMenuBurger, CiLogout } from "react-icons/ci";
import { BsQuestionCircle } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { fetchLogoutUser } from '../scripts/scripts';
import SideBarLink from './utilities/SideBarLink';

function Sidebar() {

    const [isMenuHovered, setIsMenuHovered] = useState(false)

    const handleLogout = async () => {
        await fetchLogoutUser()
        localStorage.setItem("user", "")
    }

    return (
        <div className="grid grid-rows-[100vh]"
            style={{
                gridTemplateColumns: isMenuHovered ? "10vw 90vw" : "2.5vw 97.5vw",
                transition: "grid-template-columns 0.3s ease-in-out",
            }}>
            <nav className="flex flex-col h-screen bg-background overflow-hidden shadow-md shadow-black"
                onMouseOver={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}>
                <div className='mt-10'>
                    <SideBarLink icon={CiMenuBurger} isMenuHovered={isMenuHovered} text='Dashboard' linkTo='/dashboard' />
                    <SideBarLink icon={FaSitemap} isMenuHovered={isMenuHovered} text='Sets' linkTo='/sets' />
                    <SideBarLink icon={BsQuestionCircle} isMenuHovered={isMenuHovered} text='Questions' linkTo='/questions' />
                    <SideBarLink icon={CgProfile} isMenuHovered={isMenuHovered} text='Profile' linkTo='/profile' />
                    <SideBarLink icon={IoSettingsOutline} isMenuHovered={isMenuHovered} text='Settings' linkTo='/settings' />
                    <Link className="flex justify-between overflow-hidden h-10 m-2 rounded-lg items-center hover:bg-accent p-1" to="/home"
                        onClick={() => handleLogout()}>
                        <div className=' flex justify-start'>
                            <CiLogout />
                        </div>
                        {isMenuHovered &&
                            <p className='w-[65%]'>Logout</p>
                        }
                    </Link>
                </div>
            </nav>
            <main className='bg-primary-50 font'>
                <Outlet />
            </main>
        </div>
    )
}

export default Sidebar