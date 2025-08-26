import { createContext, type ReactNode } from "react";
import { useState } from "react";
import { Refund } from "../pages/Refund";

type AuthContext = {
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
}

export const AuthContext = createContext({} as AuthContext) //default value if you want

export function AuthProvider({children}:{children: ReactNode}){
    const [session, setSession] = useState<null | UserAPIResponse>(null)

    function save(data: UserAPIResponse){
        setSession(data)
        
    }

    return (
            <AuthContext.Provider value={{session, save}}>
                {children}
            </AuthContext.Provider>
    )
}