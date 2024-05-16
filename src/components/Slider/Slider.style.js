import {CONSTANTS} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

import THEMECOLORS from '@utils/colors';

export const getStyles = (theme, type) => {
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  const commonStyles = {
    emptySlider: {
      width: '100%',
      height: 200,
    },
    sliderImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      backgroundColor: COLORS.titleMutedColor,
      borderRadius: CONSTANTS.borderRadius.L1,
    },
  };

  const fullStyles = StyleSheet.create({
    ...commonStyles.emptySlider,
    container: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      padding: CONSTANTS.margin.L6,
    },
    sliderImage: {
      ...commonStyles.sliderImage,
      backgroundColor: COLORS.white,
    },
  });

  const normalStyles = StyleSheet.create({
    ...commonStyles,
    container: {
      width: Dimensions.get('window').width - 2 * CONSTANTS.margin.L2,
      height: 200,
    },
  });

  return type === 'normal' ? normalStyles : fullStyles;
};
