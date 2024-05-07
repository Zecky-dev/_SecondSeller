import { StyleSheet } from "react-native";
import { CONSTANTS } from "@utils";
import THEMECOLORS from '@utils/colors'

export const getStyles2 = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            borderColor: COLORS.borderColor,
            borderWidth: CONSTANTS.borderWidth.thin,
            borderRadius: CONSTANTS.borderRadius.L1,
        }
    })
}