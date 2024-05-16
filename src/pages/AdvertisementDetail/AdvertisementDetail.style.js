import {CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';

import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    name: {
      color: COLORS.textColor,
      fontSize: CONSTANTS.fontSize.L5,
      flex: 1,
    },
    price: {
      color: COLORS.green,
      fontSize: CONSTANTS.fontSize.L5,
      fontWeight: '500',
    },

    namePriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: CONSTANTS.margin.L2,
    },

    ownerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginTop: CONSTANTS.margin.L2,
    },

    ownerImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },

    ownerNameSurname: {
      color: COLORS.textColor,
      fontWeight: 'bold',
      marginLeft: CONSTANTS.margin.L2,
      fontSize: CONSTANTS.fontSize.L3,
    },  

    descriptionContainer: {
      marginVertical: CONSTANTS.margin.L1,
    },

    outerContainer: {
      backgroundColor: COLORS.pageBackground,
      padding: CONSTANTS.padding.L2,
      flex: 1,
    },

    descriptionTitle: {
      fontSize: CONSTANTS.fontSize.L4,
      color: COLORS.textColor,
      fontWeight: 'bold',
    },

    description: {
      color: COLORS.textMutedColor,
    },
  });
};
