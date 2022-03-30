import { createContext } from "react"

export const ColorContext = createContext()

export default function ColorContextComponent({ children }) {
    const colors = [
        "#ffa6a6",
        "#ffcd9b",
        "#ffef98",
        "#a5ffd7",
        "#9cfff7",
        "#a5afff",
        "#e0a7ff",
    ]

    return (
        <ColorContext.Provider value={{ colors }}>
            {children}
        </ColorContext.Provider>
    )
}
