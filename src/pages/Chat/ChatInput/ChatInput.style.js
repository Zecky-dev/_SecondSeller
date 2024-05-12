import {StyleSheet} from 'react-native';
import {CONSTANTS} from '@utils';

import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: CONSTANTS.borderWidth.thin,
      borderRadius: CONSTANTS.borderRadius.L1,
      paddingHorizontal: CONSTANTS.padding.L1,
      borderColor: COLORS.blackMuted,
      alignItems: 'center',
      position: 'relative',
      backgroundColor: COLORS.cardBackground,
    },
    input: {
      flex: 1,
      color: COLORS.black,
    },
  });
};
