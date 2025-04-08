import { useEffect, useState } from "react"
import { User } from "../types/types"
import HeaderBar from "../components/HeaderBar"

function Sets() {

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
      <HeaderBar title="Sets" username={user?.username} />
    </div>
  )
}

export default Sets