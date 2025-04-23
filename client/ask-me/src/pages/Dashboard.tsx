import React, { Dispatch, SetStateAction, useEffect } from 'react'
import HeaderBar from '../components/HeaderBar'
import DashboardBody from '../components/dashboard-components/DashboardBody'
import { useState } from 'react'
import { User, Set } from '../types/types'
import { fetchGetSets } from '../scripts/scripts'

function Dashboard({ useInfoToast, openLearnThisPreset, user }: { useInfoToast: any, openLearnThisPreset: (set: Set | null) => void, user: User | null }) {

    const [sets, setSets] = useState<Set[] | null>(null)

    useEffect(() => {
        const getSets = async () => {
            const updatedSets: Set[] = await fetchGetSets()
            setSets(updatedSets)
        }
        getSets()
    }, [])

    return (
        <div>
            <HeaderBar title={"Dashboard"} username={user?.username} openLearnThisPreset={openLearnThisPreset} />
            <DashboardBody sets={sets} setSets={setSets} useInfoToast={useInfoToast} openLearnThisPreset={openLearnThisPreset} />
        </div>
    )
}

export default Dashboard