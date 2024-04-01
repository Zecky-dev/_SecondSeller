import React from 'react';
import {Dimensions, View, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import styles from './Slider.style'

const Slider = ({images}) => {
  return (
    <View>
      <SwiperFlatList
        index={0}
        showPagination
        data={images}
        renderItem={({item}) => {
            return (
                <View style={{
                    width: Dimensions.get('window').width,
                    height: 200,
                  }}>
                    <Image source={{uri: item}} style={{
                        width: '100%',
                        height: '100%',
                        
                    }}/>
                  </View>
            )
        }}
      />
    </View>
    
  );
};

export default Slider;
