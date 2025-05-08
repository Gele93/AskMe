import React, { Dispatch, SetStateAction, useEffect } from 'react'
import HeaderBar from '../components/HeaderBar'
import DashboardBody from '../components/dashboard-components/DashboardBody'
import { useState } from 'react'
import { User, Set } from '../types/types'
import { fetchGetSets, fetchGetUser } from '../scripts/scripts'

function Dashboard({ useInfoToast, openLearnThisPreset, user, setUser, sets, setSets }:
    { useInfoToast: any, openLearnThisPreset: (set: Set | null) => void, user: User | null, setUser: Dispatch<SetStateAction<User | null>>, sets: Set[], setSets: Dispatch<SetStateAction<Set[]>> }) {

    useEffect(() => {
        const getUser = async () => {
            let loggedInUser: User = await fetchGetUser()
            localStorage.setItem("user", JSON.stringify(loggedInUser))
            setUser(loggedInUser)
            console.log(loggedInUser)
        }
        getUser()
    }, [])

    useEffect(() => {
        const getSets = async () => {
            const updatedSets: Set[] = await fetchGetSets()
            setSets(updatedSets)
        }
        getSets()
    }, [])

    return (
        <div className='w-[100vw] h-[100vh] absolute'>
            <HeaderBar title={"Dashboard"} username={user?.username} openLearnThisPreset={openLearnThisPreset} />
            <DashboardBody sets={sets} setSets={setSets} useInfoToast={useInfoToast} openLearnThisPreset={openLearnThisPreset} />
        </div>
    )
}

export default Dashboard