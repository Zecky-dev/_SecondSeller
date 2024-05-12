import React from 'react';
import {Dimensions, View, Image, Text} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import { getStyles } from '../Input/Input.style';
import { useTheme } from '../../context/ThemeContext'
import ownStyles from './Slider.style';

const Slider = ({images, errors}) => {

  const {theme} = useTheme()
  const styles = getStyles(theme)
  
  if (images.length === 0) {
    return (
      <>
        <Image
          source={require('../../assets/images/selectImage.png')}
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
              <View style={ownStyles.container}>
                <Image source={{uri: item}} style={ownStyles.sliderImage} />
              </View>
            );
          }}
        />
      </View>
    );
  }
};

export default Slider;
