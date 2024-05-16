import React from 'react';
import LottieView from 'lottie-react-native';

import THEMECOLORS from '@utils/colors';
import {useTheme} from '@context/ThemeContext';

const Animation = ({animationName}) => {
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  const loadingDark = require('./animations/loading_dark.json');
  const loadingLight = require('./animations/loading_light.json');

  const animations = {
    loading: theme === 'dark' ? loadingDark : loadingLight,
  };
  const animation = animations[animationName];
  return (
    <LottieView
      source={animation}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.pageBackground,
      }}
      autoPlay
      loop
    />
  );
};

export default Animation;
