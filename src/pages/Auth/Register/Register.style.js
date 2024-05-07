import {StyleSheet} from 'react-native';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors'

export const getStyles = theme => {
  const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
  return StyleSheet.create({
    container: {
      height: '100%',
      padding: CONSTANTS.padding.L2,
    },
    formContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    appName: {
      fontFamily: 'Galada-Regular',
      fontSize: CONSTANTS.fontSize.L7,
      color: COLORS.black,
      textAlign: 'center',
    },
    title: {
      backgroundColor: COLORS.blackMuted,
      height: 0.5,
      width: '50%',
      alignSelf: 'center',
      marginTop: -CONSTANTS.margin.L4,
      marginBottom: CONSTANTS.margin.L4,
    },
    additionalStylesContainer: {
      alignSelf: 'flex-start',
      width: 50,
      height: 50,
      borderRadius: 50,
      borderWidth: CONSTANTS.borderWidth.thin,
      backgroundColor: COLORS.transparent,
      paddingHorizontal: 0,
      paddingVertical: 0,
      margin: 0,
      top: CONSTANTS.margin.L4,
      left: CONSTANTS.margin.L4,
    },
  });
}
