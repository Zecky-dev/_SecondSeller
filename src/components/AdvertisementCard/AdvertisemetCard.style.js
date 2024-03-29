import { StyleSheet } from "react-native";

import CONSTANTS from '../../utils/constants'
import COLORS from '../../utils/colors'

export default StyleSheet.create({
    cardContainer: {
        width: 200,
        height: 200,
        margin: CONSTANTS.margin.L2,
    },
    imageContainer: {

    },
    image: {
        width: 200,
        height: 200,        
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: CONSTANTS.margin.L2,
    },
    price: {
        fontSize: CONSTANTS.fontSize.L3,
        color: COLORS.blackMuted
    },
    name: {
        color: COLORS.black,
        fontSize: CONSTANTS.fontSize.L4,
        fontWeight: '400',
    }

})
