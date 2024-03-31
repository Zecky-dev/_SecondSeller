import { StyleSheet } from "react-native";

import { COLORS, CONSTANTS } from '@utils'

export default StyleSheet.create({
    cardContainer: {
        flex: 1,
        margin: CONSTANTS.margin.L1,
        alignItems: 'center',
        borderColor: COLORS.black,
        padding: CONSTANTS.padding.L1,
        borderWidth: CONSTANTS.borderWidth.thin,
        alignSelf: 'flex-start',
        borderRadius: CONSTANTS.borderRadius.L1,
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
