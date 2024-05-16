import {Dimensions, StyleSheet} from 'react-native';

import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return {
    littleCardStyles: StyleSheet.create({
      cardContainer: {
        flex: 1,
        margin: CONSTANTS.margin.L1,
        alignItems: 'center',
        borderColor: COLORS.borderColor,
        backgroundColor: COLORS.cardBackground,
        padding: CONSTANTS.padding.L1,
        borderWidth: CONSTANTS.borderWidth.thin,
        alignSelf: 'flex-start',
        borderRadius: CONSTANTS.borderRadius.L1,
        borderColor: COLORS.borderColor,
      },
      imageContainer: {},
      image: {
        width: Dimensions.get('window').width / 2 - 4 * CONSTANTS.margin.L2,
        height: 180,
      },
      infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: CONSTANTS.margin.L2,
      },
      price: {
        fontSize: CONSTANTS.fontSize.L3,
        color: COLORS.green,
      },
      name: {
        color: COLORS.cardTitle,
        fontSize: CONSTANTS.fontSize.L4,
        fontWeight: 'bold',
        marginTop: CONSTANTS.margin.L2,
      },
      addFavoriteButton: {
        position: 'absolute',
        right: CONSTANTS.margin.L3,
        top: CONSTANTS.margin.L3,
        backgroundColor: COLORS.titleColor,
        borderRadius: CONSTANTS.borderRadius.L2,
        padding: CONSTANTS.padding.L1,
      },
    }),
    bigCardStyles: StyleSheet.create({
      cardContainer: {
        margin: CONSTANTS.margin.L2,
        borderWidth: 0.5,
        backgroundColor: COLORS.cardBackground,
        padding: CONSTANTS.padding.L3,
        borderRadius: CONSTANTS.borderRadius.L2,
        borderColor: COLORS.borderColor,
      },
      image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
      },
      name: {
        textAlign: 'center',
        color: COLORS.cardTitle,
        fontSize: CONSTANTS.fontSize.L5,
        marginVertical: CONSTANTS.margin.L2,
        fontWeight: 'bold',
      },
      description: {
        fontSize: CONSTANTS.fontSize.L3,
        color: COLORS.cardDescription,
      },
      price: {
        color: COLORS.green,
        fontSize: CONSTANTS.fontSize.L4,
        fontWeight: 'bold',
        textAlign: 'right',
      },
      likeButton: {
        position: 'absolute',
        backgroundColor: COLORS.titleColor,
        borderRadius: CONSTANTS.borderRadius.L5,
        right: CONSTANTS.margin.L4,
        top: CONSTANTS.margin.L4,
        padding: CONSTANTS.padding.L1,
      },
      actionButtonsContainer: {
        flexDirection: 'row',
        marginTop: CONSTANTS.margin.L2,
      },
    }),
  };
};
