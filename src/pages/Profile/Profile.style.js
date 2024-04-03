import { COLORS, CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
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