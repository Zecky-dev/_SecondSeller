import React from 'react';
import {FlatList} from 'react-native';
import { AdvertisementCard} from '@components';

// Favorite unfavorite servis fonksiyonu
import { favoriteUnFavorite } from '../../../services/userServices';

// Uygulama genelindeki kullanıcıyı döndüren hook
import {useUser} from '../../../context/UserProvider';

const Advertisements = ({advertisements}) => {
    
    const { user : { _id: id } } = useUser()

    return (
        <FlatList
          data={advertisements}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <AdvertisementCard
              advertisement={item}
              isOwner={ id === item.owner}
              favoriteUnfavorite={favoriteUnFavorite}
              big={true}
              onPress={() => {
                navigation.navigate('AdvertisementDetailScreen', {
                  id: item._id,
                });
              }}
            />
          )}
        />
      );
};

export default Advertisements;
