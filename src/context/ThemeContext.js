import React, { createContext, useState, useContext, useEffect } from 'react'
import Storage from '@utils/Storage';

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

    const [theme,setTheme] = useState("light");

    useEffect(() => {
        const fetchTheme = async () => {
            const savedTheme = await Storage.getData('theme');
            if(savedTheme !== null) {
                setTheme(savedTheme)
            }
        } 
        fetchTheme()
    },[])
    

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