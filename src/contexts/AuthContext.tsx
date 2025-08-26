import { createContext, type ReactNode } from "react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

type AuthContext = {
    isLoading: boolean
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    remove: () => void
}

const LOCAL_STORAGE_KEY = "@Refund"

export const AuthContext = createContext({} as AuthContext) //default value if you want

export function AuthProvider({children}:{children: ReactNode}){
    const [session, setSession] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState(true)

    function save(data: UserAPIResponse){
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, JSON.stringify(data.token))

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

        setSession(data) 
    }

    function remove(){
        
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

        setSession(null)

        window.location.assign("/")
    }

    function loadUser(){
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

        if (token && user) {

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setSession({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

    useEffect (() => {
        loadUser()
    }, [])

    return (
            <AuthContext.Provider value={{session, save, isLoading, remove}}>
                {children}
            </AuthContext.Provider>
    )
}