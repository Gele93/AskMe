import React, { useEffect } from 'react'
import HeaderBar from '../components/HeaderBar'
import DashboardBody from '../components/dashboard-components/DashboardBody'
import { useState } from 'react'
import { User, Set } from '../types/types'
import { fetchGetSets } from '../scripts/scripts'

function Dashboard() {

    const [user, setUser] = useState<User | null>(null)
    const [sets, setSets] = useState<Set[] | null>(null)

    useEffect(() => {
        const userData: string | null = localStorage.getItem("user")
        if (userData) {
            const curUser: User = JSON.parse(userData)
            setUser(curUser)
        }
    }, [])

    useEffect(() => {
        const getSets = async () => {
            const updatedSets: Set[] = await fetchGetSets()
            setSets(updatedSets)
        }
        getSets()
    }, [])

    return (
        <div>
            <HeaderBar title={"Dashboard"} username={user?.username} />
            <DashboardBody sets={sets} />
        </div>
    )
}

export default Dashboard