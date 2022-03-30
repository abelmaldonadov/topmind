import { createContext, useState } from "react"

export const UserContext = createContext()

export default function UserContextComponent({ children }) {
    const [user, setUser] = useState(undefined)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
