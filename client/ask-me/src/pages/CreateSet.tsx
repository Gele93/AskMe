import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../components/HeaderBar'
import { User } from '../types/types'
import CreateSetBody from '../components/create-set-components/CreateSetBody'

function CreateSet() {

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
            <HeaderBar title='Create Set' username={user?.username} />
            <CreateSetBody user={user} />
        </div>
    )
}

export default CreateSet