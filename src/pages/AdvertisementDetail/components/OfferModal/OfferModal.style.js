import {CONSTANTS} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: COLORS.pageBackground,
      left: 0,
      right: 0,
      bottom: 0,
      margin: -CONSTANTS.margin.L1,
      padding: CONSTANTS.padding.L3,
      justifyContent: 'space-evenly',
      height: Dimensions.get('window').height * 0.35,
      borderTopLeftRadius: CONSTANTS.borderRadius.L3,
      borderTopRightRadius: CONSTANTS.borderRadius.L3,
    },
    offerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    offer: {
      color: COLORS.white,
      fontSize: CONSTANTS.fontSize.L5,
      fontWeight: 'bold',
      width: '45%',
      backgroundColor: COLORS.primary,
      textAlign: 'center',
      padding: CONSTANTS.padding.L4,
      borderWidth: 1,
      borderColor: COLORS.titleColor,
      borderRadius: CONSTANTS.borderRadius.L2,
    },
  });
};
