"use client"

import { ReactNode, createContext, useEffect, useState } from "react"

export type ThemeContextType = {
    theme : string,
    toggle: ()=>void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

const getFromLocalStorage = ():string => {
    if (typeof window !== "undefined") {
        const value = localStorage.getItem("theme")
        return value || "light"
    }
    return "light"
}

export const ThemeContextProvider = ({children}
    :{children:ReactNode}):ReactNode => {
    
    const [theme,setTheme] = useState<string>(() => {
        return getFromLocalStorage()
    })

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        localStorage.setItem("theme",theme)
    },[theme])

    return (
        <ThemeContext.Provider value={{theme , toggle}}>
            {children}
        </ThemeContext.Provider>
    )
}