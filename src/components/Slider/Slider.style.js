import {CONSTANTS} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

import THEMECOLORS from '@utils/colors';

export const getStyles = theme => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  return StyleSheet.create({
    emptySlider: {
      width: '100%',
      height: 200,
    },
    container: {
      width: Dimensions.get('window').width - 2 * CONSTANTS.margin.L2,
      height: 200,
    },
    sliderImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      backgroundColor: COLORS.titleMutedColor,
      borderRadius: CONSTANTS.borderRadius.L1,
    },
  });
};
