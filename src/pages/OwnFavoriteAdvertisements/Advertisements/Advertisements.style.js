import {StyleSheet} from 'react-native'
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            backgroundColor: COLORS.white,
            flex: 1,
        }
    })
}


