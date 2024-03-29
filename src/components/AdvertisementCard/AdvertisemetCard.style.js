import { StyleSheet } from "react-native";

import CONSTANTS from '../../utils/constants'
import COLORS from '../../utils/colors'

export default StyleSheet.create({
    cardContainer: {
        flex:1,
        margin: 4,
        alignItems: 'center',
        borderColor: 'black',
        padding: 4,
        borderWidth: 0.5,
        alignSelf: 'flex-start',
        borderRadius: 2,
    },
    imageContainer: {

    },
    image: {
        width: 180,
        height: 180,        
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
    },
    addFavoriteButton: {
        position: "absolute",
        right: CONSTANTS.margin.L3,
        top: CONSTANTS.margin.L3,
        backgroundColor: COLORS.white,
        borderRadius: CONSTANTS.borderRadius.L4,
        padding: CONSTANTS.padding.L1
    }

})
