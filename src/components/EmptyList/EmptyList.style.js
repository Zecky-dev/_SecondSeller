import {StyleSheet} from 'react-native';
import THEMECOLORS from '@utils/colors';
import {CONSTANTS} from '@utils';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.pageBackground,
      justifyContent: 'center',
    },
    vector: {
      width: '90%',
      height: '50%',
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    label: {
      color: COLORS.textColor,
      textAlign: 'center',
      fontWeight: '300',
      marginTop: CONSTANTS.margin.L4,
      fontSize: CONSTANTS.fontSize.L6,
    },
  });
};
