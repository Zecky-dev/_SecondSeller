import React from 'react';
import {Dimensions, View, Image, Text} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import styles from '../Input/Input.style';

const Slider = ({images, errors}) => {

  if (images.length === 0) {
    return (
      <>
        <Image
        source={require('../../assets/images/selectImage.png')}
        style={{
          width: '100%',
          height: 150,
        }}
        resizeMode='contain'
        />
        {errors && <Text style={[styles.errorMessage,{textAlign: 'center'}]}>{errors}</Text>}
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
              <View
                style={{
                  width: Dimensions.get('window').width,
                  height: 200,
                }}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4
                  }}
                />
              </View>
            );
          }}
        />
  
      </View>
    );
  }
};

export default Slider;
