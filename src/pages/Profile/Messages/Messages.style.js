import {StyleSheet} from 'react-native';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    backButton: {
      alignSelf: 'flex-start',
      width: 50,
      height: 50,
      borderRadius: 50,
      borderWidth: CONSTANTS.borderWidth.thin,
      backgroundColor: COLORS.transparent,
      paddingHorizontal: 0,
      paddingVertical: 0,
      margin: 0,
      position: 'absolute',
      top: CONSTANTS.margin.L4,
      left: CONSTANTS.margin.L4,
    },
    screenTitle: {
      color: COLORS.textColor,
      textAlign: 'center',
      fontSize: CONSTANTS.fontSize.L5,
      fontWeight: 'bold',
      marginVertical: CONSTANTS.margin.L2,
    },
    messageCardContainer: {
      flex: 1,
      backgroundColor: COLORS.pageBackground,
    },
  });
};
