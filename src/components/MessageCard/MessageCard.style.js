import { COLORS, CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        padding: CONSTANTS.padding.L2,
        marginHorizontal: CONSTANTS.margin.L3,
        marginVertical: CONSTANTS.margin.L1,
        borderRadius: CONSTANTS.borderRadius.L2    
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        color: COLORS.black,
        fontSize: CONSTANTS.fontSize.L5,
        flex: 1,
        textAlign: 'center'
    }
})