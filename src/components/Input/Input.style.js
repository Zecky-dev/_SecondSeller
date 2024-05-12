import {StyleSheet} from 'react-native'

import { CONSTANTS } from '@utils'
import THEMECOLORS from '@utils/colors'


export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        outerContainer: {
            margin: CONSTANTS.margin.L2
        },
        inputContainer: {
            borderWidth: CONSTANTS.borderWidth.thin,
            borderRadius: CONSTANTS.borderRadius.L1,
            paddingHorizontal: CONSTANTS.padding.L2,
            borderColor: COLORS.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
        },
        label: {
            color: COLORS.textColor,
            fontWeight: '600',
            fontSize: CONSTANTS.fontSize.L3,
            marginBottom: CONSTANTS.margin.L1
        },
        input: {
            flex: 1,
            color: COLORS.textColor,
            fontSize: CONSTANTS.fontSize.L3
        },
        errorMessage: {
            color: COLORS.red,
        }
    })
}
