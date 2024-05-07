import { StyleSheet } from "react-native";

import { CONSTANTS } from '@utils'
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            backgroundColor: COLORS.primary,
            paddingHorizontal: CONSTANTS.padding.L5,
            paddingVertical: CONSTANTS.padding.L2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: CONSTANTS.margin.L2,
            borderRadius: CONSTANTS.borderRadius.L1,
            // alignSelf: 'flex-start',
            //minWidth: 120,
        },
        label: {
            color: COLORS.titleColor,
            fontSize: CONSTANTS.fontSize.L4
        },
        icon: {
            //marginRight: CONSTANTS.margin.L1
        },
        loadingIndicator: {
            marginRight: CONSTANTS.margin.L2
        }
    })
}