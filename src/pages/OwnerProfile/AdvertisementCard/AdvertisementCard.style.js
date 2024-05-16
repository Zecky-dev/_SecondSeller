import { StyleSheet } from 'react-native'
import THEMECOLORS from '@utils/colors'
import { CONSTANTS } from '@utils'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container:  {
            backgroundColor: COLORS.cardBackground,
            flexDirection: 'row',
            marginVertical: CONSTANTS.margin.L2,
            padding: CONSTANTS.padding.L1,
        },
        innerRightContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },  
        title: {
            color: COLORS.cardTitle,
            fontSize: CONSTANTS.fontSize.L5
        },
        description: {
            color: COLORS.cardDescription,  
        },
        image:{
            width: 100,
            height: 100,
        }
    })
}