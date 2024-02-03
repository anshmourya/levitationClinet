
import { useState, useEffect } from "react"
const useAuth = () => {
    const [isloggedIn, setIsloggedIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsloggedIn(true)
        }

    }, [])
    return { isloggedIn, setIsloggedIn, loading, setLoading }
}

export default useAuth