import {StyleSheet} from 'react-native';

import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS['DARK'] : THEMECOLORS['LIGHT'];
  return StyleSheet.create({
    appName: {
      fontSize: CONSTANTS.fontSize.L7,
      color: COLORS.textColor,
      fontFamily: CONSTANTS.APP_FONT,
      textAlign: 'center',
    },
    appSlogan: {
      fontSize: CONSTANTS.fontSize.L4,
      color: COLORS.textColor,
      fontFamily: CONSTANTS.APP_FONT,
      textAlign: 'center',
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.pageBackground,
    },
    createAccountLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: CONSTANTS.margin.L3,
    },
    createAccountLabel: {
      color: COLORS.textColor,
      fontSize: CONSTANTS.fontSize.L3,
    },
    createAccountLabelButton: {
      color: COLORS.link,
      textDecorationLine: 'underline',
      fontSize: CONSTANTS.fontSize.L3,
    },
    forgotPasswordLabel: {
      color: COLORS.link,
      textDecorationLine: 'underline',
      fontSize: CONSTANTS.fontSize.L4,
      textAlign: 'center',
      marginTop: CONSTANTS.margin.L3,
      fontWeight: '400',
    },
    vectorImage: {
      width: '75%',
      height: 200,
      alignSelf: 'center',
    },
  });
};
