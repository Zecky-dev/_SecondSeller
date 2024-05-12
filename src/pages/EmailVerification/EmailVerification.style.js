import { CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";

import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: COLORS.pageBackground,
            justifyContent: 'center',
        },
        image: {
            width: '75%',
            height: 200,
            alignSelf: 'center',
        },
        infoMessage: {
            color: COLORS.textColor,
            textAlign: 'center',
            fontSize: CONSTANTS.fontSize.L4
        },
        textContainer: {
            marginTop: CONSTANTS.margin.L5,
        }
    })
}
