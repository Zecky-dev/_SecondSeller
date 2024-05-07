import { CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
    const COLORS = theme === "dark" ? THEMECOLORS.DARK: THEMECOLORS.LIGHT
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.pageBackground,
        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 100
        },
        name: {
            color: COLORS.textColor,
            fontSize: CONSTANTS.fontSize.L6,
            marginVertical: CONSTANTS.margin.L3
        },
        profileButtonStyle : {
            container: {
              width: '90%',
              backgroundColor: 'transparent',
              borderWidth: CONSTANTS.borderWidth.thin,
              borderColor: COLORS.borderColor,
            },
            label: {
              marginLeft: CONSTANTS.margin.L1,
              color: COLORS.textColor,
              fontSize: CONSTANTS.fontSize.L4,
            },
        }
    })
}
