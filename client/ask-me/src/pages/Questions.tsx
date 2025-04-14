import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { Set, User } from "../types/types"
import HeaderBar from "../components/HeaderBar"

function Questions({ openLearnThisPreset }: { openLearnThisPreset: (set: Set | null) => void }) {
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
      <HeaderBar title="Questions" username={user?.username} openLearnThisPreset={openLearnThisPreset} />
    </div>
  )
}

export default Questions