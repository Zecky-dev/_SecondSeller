import { StyleSheet } from 'react-native'
import { CONSTANTS } from '@utils'
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.pageBackground,
            padding: CONSTANTS.padding.L3,
        },
        ownerInfoContainer: {
            alignItems: 'center',
        },
        ownerImage: {
            width: 200,
            height: 200,
            borderRadius: 100,
        },
        ownerNameSurname: {
            color: COLORS.textColor,
            fontSize: CONSTANTS.fontSize.L6,
            marginVertical: CONSTANTS.margin.L1,
        }
    })
}

