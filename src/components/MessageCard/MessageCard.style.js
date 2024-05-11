import {CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';
import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.cardBackground,
      padding: CONSTANTS.padding.L2,
      marginHorizontal: CONSTANTS.margin.L3,
      marginVertical: CONSTANTS.margin.L1,
      borderRadius: CONSTANTS.borderRadius.L2,
      borderWidth: 1,
      borderColor: COLORS.blackMuted,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    name: {
      color: COLORS.cardTitle,
      fontSize: CONSTANTS.fontSize.L5,
      flex: 1,
      textAlign: 'center',
    },
  });
};
