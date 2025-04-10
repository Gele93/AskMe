import { useEffect, useState } from "react"
import { Set, User } from "../types/types"
import HeaderBar from "../components/HeaderBar"
import { fetchGetSets } from "../scripts/scripts"
import SetsBody from "../components/sets-components/SetsBody"

function Sets({ useInfoToast }: { useInfoToast: any }) {

  const [user, setUser] = useState<User | null>(null)
  const [sets, setSets] = useState<Set[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const curUserData = localStorage.getItem("user")
    if (curUserData) {
      const curUser = JSON.parse(curUserData)
      setUser(curUser)
    }
  }, [])

  useEffect(() => {
    const getSets = async () => {
      const updatedSets = await fetchGetSets()
      setSets(updatedSets)
    }
    if (user) {
      setIsLoading(true)
      getSets()
      setIsLoading(false)
    }
  }, [user])



  return (
    <div className="grid grid-rows-[15%_85%] gap-5">
      <HeaderBar title="Sets" username={user?.username} />
      {isLoading ?
        <div className="loader"></div>
        :
        <SetsBody sets={sets} setSets={setSets} useInfoToast={useInfoToast} />
      }
    </div>
  )
}

export default Sets