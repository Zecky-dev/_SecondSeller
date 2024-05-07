import {CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';
import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.pageBackground,
    },
    imageBox: {
      alignSelf: 'center',
      marginTop: CONSTANTS.margin.L3,
      width: 200,
      height: 200,
      borderRadius: 100,
      padding: CONSTANTS.padding.L1,
      borderWidth: 5,
      borderColor: COLORS.textColor,
      borderStyle: 'dashed',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
    },
    changePassword: {
      fontSize: CONSTANTS.fontSize.L4,
      fontWeight: 'bold',
      color: COLORS.black,
      marginHorizontal: CONSTANTS.margin.L2,
      marginVertical: CONSTANTS.margin.L1,
      padding: CONSTANTS.padding.L1,
      textDecorationLine: 'underline',
    },
    profileButtonStyle: {
      container: {
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
  });
};
