import React from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const {height, width} = Dimensions.get('window');

import { Slider, Button } from '@components';
import { COLORS } from '@utils';

import styles from './AdvertisementDetail.style';


const AdvertisementDetail = ({advertisement}) => {
  const { id, name, price, description, location, images } = advertisement;

  const LONGITUDE = location.long;
  const LATITUDE = location.lat;
  const LATITUDE_DELTA = 0.50;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  return (
    <View style={styles.outerContainer}>
      <ScrollView>
        
        {/* Slider */}
        <Slider images={images} />

        {/* Slider Altındaki Açıklamalar */}
        <View style={styles.namePriceContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price} TL</Text>
        </View>

        {/* İlan açıklaması */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>İlan Açıklama</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* İlan Konumunun Görüntülenmesi */}
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          zoomEnabled={true}
          scrollEnabled={true}
          style={{
            width: '100%',
            height: 250,
          }}>
          <Marker
            coordinate={{
              latitude: location.lat,
              longitude: location.long,
            }}
            key={id}
            title="İlan Konumu"
            style={{width: 26, height: 40}}
            description={'İlan konumu açıklaması'}
            resizeMode="contain"
          />
        </MapView>

        <View style={{flexDirection: 'row'}}>
          <Button 
            icon={{
              name: "chat",
              color: COLORS.white,
              size: 24
            }}
            label='Sohbet Başlat'
            additionalStyles={{
              container: {
                flex: 1,
              }
            }}
            onPress={() => console.log("Chat ekranına git")}
          />
          <Button 
            icon={{
              name: "offer",
              color: COLORS.white,
              size: 24
            }}
            additionalStyles={{
              container: {
                flex: 1,
              }
            }}
            label='Teklif Ver'
            onPress={() => console.log("Teklif Ver")}
          />
        </View>

      </ScrollView>
    </View>
  );
};

export default AdvertisementDetail;
