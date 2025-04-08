import { useState, useEffect } from "react"
import { User } from "../types/types"
import HeaderBar from "../components/HeaderBar"

function Questions() {
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
      <HeaderBar title="Questions" username={user?.username} />
    </div>
  )
}

export default Questions