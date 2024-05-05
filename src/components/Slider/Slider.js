import React from 'react';
import {Dimensions, View, Image, Text} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import styles from '../Input/Input.style';
import ownStyles from './Slider.style';
import {CONSTANTS} from '@utils';

const Slider = ({images, errors}) => {
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
