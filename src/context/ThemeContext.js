import React, { createContext, useState, useContext } from 'react'

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    
    const [theme, setTheme] = useState("light")

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const {theme, setTheme} = useContext(ThemeContext)
    return { theme, setTheme }
} 


export default ThemeContextProvider