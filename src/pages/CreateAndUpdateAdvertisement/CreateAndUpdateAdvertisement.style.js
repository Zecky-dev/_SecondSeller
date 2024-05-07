import {StyleSheet} from 'react-native';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
  const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      padding: CONSTANTS.padding.L2,
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.pageBackground
    },
  });
}

