import { SessionType } from "@/types/schema"
import { useEffect, useState } from "react"

function useSession() {
    const [session, setSession] = useState<SessionType | null>(null)
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user')!)
        setSession(user)
    }, [])

    return { session }
}

export default useSession