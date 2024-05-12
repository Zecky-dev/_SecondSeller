import {CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';

import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: CONSTANTS.padding.L1,
      backgroundColor: COLORS.pageBackground,
    },
    vectorImage: {
      width: '75%',
      height: 200,
      alignSelf: 'center',
    },
  });
};
