import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList} from 'react-native';

import {getAdvertisementAPI} from '../../services/advertisementServices';
import {useUser} from '../../context/UserProvider';
import {useTheme} from '../../context/ThemeContext';
import {getStyles} from './OwnerProfile.style';

import {Animation} from '@components';
import AdvertisementCard from './AdvertisementCard';


const OwnerProfile = ({navigation,route}) => {
  
  const {
    user: {_id: id, token},
  } = useUser();
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [loading, setLoading] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);

  const {advertisementOwner} = route.params;
  const advertisementIDs = advertisementOwner.advertisements;

  const getAdvertisements = async () => {
    const tempAdvertisements = [];
    setLoading(true);
    for (let advertisementID of advertisementIDs) {
      try {
        const advertisementData = (
          await getAdvertisementAPI(advertisementID, token)
        ).data;
        tempAdvertisements.push(advertisementData);
      } catch (err) {}
    }
    setAdvertisements(tempAdvertisements);
    console.log(tempAdvertisements);
    setLoading(false);
  };

  useEffect(() => {
    getAdvertisements();
  }, []);

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.ownerInfoContainer}>
          <Image
            source={
              advertisementOwner.imageURL
                ? {uri: advertisementOwner.imageURL}
                : require('@assets/images/avatar.png')
            }
            style={styles.ownerImage}
          />
          <Text style={styles.ownerNameSurname}>
            {advertisementOwner.nameSurname}
          </Text>
        </View>

        <FlatList
          data={advertisements}
          keyExtractor={(item) => item._id}
          renderItem={({index, item}) => (
            <AdvertisementCard
              theme={theme}
              advertisement={item}
              key={item._id}
              onPress={() => {
                navigation.push('OwnerProfileDetail', {
                    screen: 'AdvertisementDetailScreen',
                    params: { id: item._id }  
                })
              }}
            />
          )}
        />
      </View>
    );
  }
};

export default OwnerProfile;
