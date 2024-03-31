import { StyleSheet } from "react-native";

import { CONSTANTS, COLORS } from "@utils";


export default StyleSheet.create({
    appName: {
        fontSize: CONSTANTS.fontSize.L7,
        color: COLORS.black,
        fontFamily: CONSTANTS.APP_FONT,
        textAlign: 'center',
    },
    appSlogan: {
        fontSize: CONSTANTS.fontSize.L4,
        color: COLORS.black,
        fontFamily: CONSTANTS.APP_FONT,
        textAlign: 'center',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    createAccountLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: CONSTANTS.margin.L3
    },
    createAccountLabel:{
        color: COLORS.black,
        fontSize: CONSTANTS.fontSize.L3
    },
    createAccountLabelButton:{
        color: COLORS.link,
        textDecorationLine: 'underline',
        fontSize: CONSTANTS.fontSize.L3
    },
    forgotPasswordLabel: {
        color: COLORS.link,
        textDecorationLine: 'underline',
        fontSize: CONSTANTS.fontSize.L4,
        textAlign: 'center',
        marginTop: CONSTANTS.margin.L3,
        fontWeight: '400'
    },
    vectorImage: {
        width: '75%',
        height: 200,
        alignSelf: 'center'
    }
})