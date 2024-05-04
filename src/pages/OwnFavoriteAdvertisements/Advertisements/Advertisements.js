import React from 'react';
import {FlatList} from 'react-native';
import {AdvertisementCard} from '@components';

// Favorite unfavorite servis fonksiyonu
import {favoriteUnFavorite} from '../../../services/userServices';
import {updateAdversiment} from '../../../services/advertisementServices';

// Uygulama genelindeki kullanıcıyı döndüren hook
import {useUser} from '../../../context/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {showFlashMessage} from '@utils/functions';

const Advertisements = ({advertisements}) => {
  const {
    user: {_id: id, token},
  } = useUser();

  const navigation = useNavigation();

  const handleUpdate = async (id, values) => {
    const response = await updateAdversiment(id, values, token);
    showFlashMessage(response.status, response.data.message);
  };

  return (
    <FlatList
      data={advertisements}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <AdvertisementCard
          advertisement={item}
          isOwner={id === item.owner}
          favoriteUnfavorite={favoriteUnFavorite}
          big={true}
          onPress={() => {
            navigation.navigate('OwnAdvertisementDetailScreen', {id: item._id});
          }}
          handleUpdate={handleUpdate}
        />
      )}
    />
  );
};

export default Advertisements;
