import { CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK: THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 100
        },
        name: {
            color: COLORS.black,
            fontSize: CONSTANTS.fontSize.L6,
            marginVertical: CONSTANTS.margin.L3
        }
    })
}
