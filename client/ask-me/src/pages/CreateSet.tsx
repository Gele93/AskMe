import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar'
import { Set, User } from '../types/types'
import CreateSetBody from '../components/create-set-components/CreateSetBody'

function CreateSet({ useInfoToast, openLearnThisPreset }: { useInfoToast: any, openLearnThisPreset: (set: Set | null) => void }) {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const curUserData = localStorage.getItem("user")
        if (curUserData) {
            const curUser = JSON.parse(curUserData)
            setUser(curUser)
        }
    }, [])

    return (
        <div>
            <HeaderBar title='Create Set' username={user?.username} openLearnThisPreset={openLearnThisPreset} />
            <CreateSetBody user={user} useInfoToast={useInfoToast} />
        </div>
    )
}

export default CreateSet