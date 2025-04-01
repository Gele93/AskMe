import React, { useEffect } from 'react'
import HeaderBar from '../components/HeaderBar'
import DashboardBody from '../components/dashboard-components/DashboardBody'
import { useState } from 'react'
import { User } from '../types/types'

function Dashboard() {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const userData: string | null = localStorage.getItem("user")
        if (userData) {
            const curUser: User = JSON.parse(userData)
            setUser(curUser)
        }
    }, [])

    return (
        <div className="grid grid-rows-[8vh_4vh_88vh]">
            <section className='flex justify-center items-center w-[90%] mx-auto'>
                <HeaderBar title={"Dashboard"} username={user?.username} />
            </section>
            <div></div>
            <section className=''>
                <DashboardBody />
            </section>
        </div>
    )
}

export default Dashboard