import { CONSTANTS } from "@utils";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flexGrow: 1,
        justifyContent: 'center',
        margin: CONSTANTS.margin.L1
    },
    vectorImage: {
        width: '75%',
        height: 200,
        alignSelf: 'center'
    },
})