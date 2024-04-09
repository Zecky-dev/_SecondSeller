import { COLORS, CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    image: {
        width: '75%',
        height: 200,
        alignSelf: 'center',
    },
    infoMessage: {
        color: COLORS.link,
        textAlign: 'center',
        fontSize: CONSTANTS.fontSize.L4
    },
    textContainer: {
        marginTop: CONSTANTS.margin.L5,
    }
})