import React from 'react';
import {FlatList} from 'react-native';
import {AdvertisementCard, EmptyList} from '@components';

// Favorite unfavorite servis fonksiyonu
import {favoriteUnFavorite} from '../../../services/userServices';
import {updateAdvertisementAPI} from '../../../services/advertisementServices';

// Uygulama genelindeki kullanıcıyı döndüren hook
import {useUser} from '../../../context/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {showFlashMessage} from '@utils/functions';

import THEMECOLORS from '@utils/colors';
import {useTheme} from '../../../context/ThemeContext';

const Advertisements = ({advertisements}) => {
  const {
    user: {_id: id, token},
  } = useUser();
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  const navigation = useNavigation();

  const handleSoldStatus = async (id, values) => {
    const response = await updateAdvertisementAPI(id, values, token);
    showFlashMessage(response.status, response.data.message);
  };

  if (advertisements.length === 0) {
    return <EmptyList label={'İlan listesi boş!'} />;
  } else {
    return (
      <FlatList
        data={advertisements}
        style={{backgroundColor: COLORS.pageBackground}}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <AdvertisementCard
            advertisement={item}
            isOwner={id === item.owner}
            favoriteUnfavorite={favoriteUnFavorite}
            big={true}
            onPress={() => {
              navigation.navigate('OwnAdvertisementDetailScreen', {
                id: item._id,
              });
            }}
            handleSoldStatus={handleSoldStatus}
            handleUpdateButton={() => {
              navigation.navigate('UpdateAdvertisementScreen', {
                advertisement: item,
                isOwnStack: true,
              });
            }}
          />
        )}
      />
    );
  }
};

export default Advertisements;
