import React from 'react';
import {Linking, Platform, Image, Pressable} from 'react-native';

import styles from './MapBubble.style';

const MapBubble = ({latitude, longitude, username}) => {
  const openMap = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${username}@${latLng}`,
      android: `${scheme}${latLng}(${username})`,
    });

    Linking.openURL(url);
  };
  return (
    <Pressable onPress={() => openMap()}>
      <Image
        source={require('@assets/images/location.png')}
        style={styles.container}
      />
    </Pressable>
  );
};

export default MapBubble;
