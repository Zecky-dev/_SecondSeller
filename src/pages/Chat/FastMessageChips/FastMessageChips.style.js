import {StyleSheet} from 'react-native';
import THEMECOLORS from '@utils/colors';
import {CONSTANTS} from '@utils';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      marginVertical: CONSTANTS.margin.L2,
    },
    message: {
      borderRadius: CONSTANTS.borderRadius.L2,
      fontSize: CONSTANTS.fontSize.L3,
      fontWeight: '600',
      color: COLORS.titleColor,
      backgroundColor: COLORS.primary,
      padding: CONSTANTS.padding.L3,
      margin: CONSTANTS.margin.L1,
    },
  });
};
