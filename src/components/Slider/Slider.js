import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import {getStyles} from '../Input/Input.style';
import {useTheme} from '@context/ThemeContext';
import {getStyles as getSliderStyles} from './Slider.style';

// Image vectors
import SelectImageLight from '@assets/images/select_image_light.png';
import SelectImageDark from '@assets/images/select_image_dark.png';

const Slider = ({images, errors, onPress, type = 'normal'}) => {
  const {theme} = useTheme();
  const ownStyles = getSliderStyles(theme, type);
  const styles = getStyles(theme);

  const SelectImageVector =
    theme === 'dark' ? SelectImageDark : SelectImageLight;

  if (images.length === 0) {
    return (
      <>
        <Image
          source={SelectImageVector}
          style={ownStyles.emptySlider}
          resizeMode="contain"
        />
        {errors && (
          <Text style={[styles.errorMessage, {textAlign: 'center'}]}>
            {errors}
          </Text>
        )}
      </>
    );
  } else {
    return (
      <View>
        <SwiperFlatList
          index={0}
          showPagination
          data={images}
          renderItem={({item}) => {
            return (
              <Pressable style={ownStyles.container} onPress={onPress}>
                <Image source={{uri: item}} style={ownStyles.sliderImage} />
              </Pressable>
            );
          }}
        />
      </View>
    );
  }
};

export default Slider;
