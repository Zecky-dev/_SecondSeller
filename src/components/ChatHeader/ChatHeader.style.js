import { StyleSheet } from 'react-native'
import THEMECOLORS from '@utils/colors'
import { CONSTANTS } from '@utils'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            backgroundColor: COLORS.primary,
            flexDirection: 'row',
            padding: CONSTANTS.padding.L3,
            alignItems: 'center'
            
          },
          advertisementName: {
            color: COLORS.titleColor,
            fontSize: CONSTANTS.fontSize.L5,
            flex: 1,
            fontWeight: 'bold',
          },
          button: {
            marginHorizontal: CONSTANTS.margin.L2,
            backgroundColor: COLORS.primary,
          }
    })
}