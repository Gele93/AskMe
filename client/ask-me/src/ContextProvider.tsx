import React, { createContext, useState } from 'react'
import { User } from './types/types'

interface AskMeContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AskMeContext = createContext<AskMeContextType | null>(null);

function ContextProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)

    return (
        <AskMeContext.Provider value={{ user, setUser }}>
            {children}
        </AskMeContext.Provider>
    )
}

export default ContextProvider