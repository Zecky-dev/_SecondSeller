import React, { createContext, useState, useContext, useEffect } from 'react'
import Storage from '@utils/Storage';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

    const [theme,setTheme] = useState(null);

    useEffect(() => {
        const colorSchema = Appearance.getColorScheme()
        const fetchTheme = async () => {
            const savedTheme = await Storage.getData('theme');
            if(savedTheme !== null) {
                setTheme(savedTheme)
            }
            else {
                setTheme(colorSchema)
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