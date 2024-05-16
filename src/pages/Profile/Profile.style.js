import {CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';
import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.pageBackground,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    name: {
      color: COLORS.textColor,
      fontSize: CONSTANTS.fontSize.L6,
      marginVertical: CONSTANTS.margin.L3,
    },
    profileButtonStyle: {
      container: {
        width: '90%',
        backgroundColor: 'transparent',
        borderWidth: CONSTANTS.borderWidth.thin,
        borderColor: COLORS.borderColor,
      },
      label: {
        marginLeft: CONSTANTS.margin.L1,
        color: COLORS.textColor,
        fontSize: CONSTANTS.fontSize.L4,
      },
    },
    switch: {
      backgroundColor: 'transparent',
      paddingHorizontal: CONSTANTS.padding.L5,
      paddingVertical: CONSTANTS.padding.L2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: CONSTANTS.margin.L2,
      borderRadius: CONSTANTS.borderRadius.L1,
      borderWidth: CONSTANTS.borderWidth.thin,
      borderColor: COLORS.borderColor,
      width: '90%',
    },
    switchLabel: {
      textAlign: 'center',
      color: COLORS.textColor,
      fontSize: CONSTANTS.fontSize.L4,
      marginHorizontal: CONSTANTS.margin.L1,
    },
  });
};
