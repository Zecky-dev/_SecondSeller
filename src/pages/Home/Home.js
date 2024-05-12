import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {useUser} from '../../context/UserProvider';

import {
  getAllAdvertisementAPI,
  getFilteredAdvertisement,
} from '../../services/advertisementServices';
import {favoriteUnFavorite} from '../../services/userServices';

import FilterModal from './components/FilterModal/FilterModal';
import {AdvertisementCard, Button, Input, EmptyList} from '@components';

import THEMECOLORS from '@utils/colors';
import {useTheme} from '../../context/ThemeContext';
import { showMessage } from 'react-native-flash-message';

import EmptyListDarkVector from '@assets/images/empty_list_dark.png'
import EmptyListLightVector from '@assets/images/empty_list_light.png'


const Home = ({navigation}) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const [search, setSearch] = useState('');

  const {user} = useUser();
  const {theme} = useTheme();
  
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  const EmptyListVector = theme === "dark" ? EmptyListDarkVector : EmptyListLightVector


  const filter = async values => {
    const filteredAdvertisements = await getFilteredAdvertisement(
      values,
      user.token,
    );
    setAdvertisements(filteredAdvertisements);
    setFilterModalVisible(false);
  };

  // Sistemden tüm ilanları getirir
  const getAllAdvertisements = () => {
    setLoading(true);
    getAllAdvertisementAPI(user.token)
      .then(response => {
        const advertisements = response.data.data;
        setAdvertisements(advertisements);
      })
      .catch(err => {
        showMessage({
          message: 'İlanlar getirilirken bir hata meydana geldi!',
          type: 'danger',
        });
      });
    setLoading(false);
  };

  // 'Home' sayfasına her focus olunduğunda sistemdeki ilanları getirir
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllAdvertisements();
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.pageBackground,
          }}>
          <Input
            placeholder="İlan ara.."
            onChangeText={value => {
              if (value === '') {
                getAllAdvertisements();
              } else {
                setSearch(value);
              }
            }}
            additionalStyles={{outerContainer: {flex: 1}}}
            onSubmitEditing={() => filter({title: search})}
          />

          <Button
            onPress={() => setFilterModalVisible(true)}
            icon={{name: 'filter', color: 'white', size: 24}}
          />
        </View>

        {loading ? (
          <Animation animationName={'loading'} />
        ) : advertisements.length === 0 ? (
          <EmptyList label={'İlan listesi boş!'} vector={EmptyListVector} />
        ) : (
          <>
            <FlatList
              data={advertisements.filter(
                advertisement => advertisement.soldStatus == false,
              )}
              style={{backgroundColor: COLORS.pageBackground}}
              keyExtractor={(item, index) => item._id}
              numColumns={2}
              renderItem={({item}) => (
                <AdvertisementCard
                  advertisement={item}
                  isOwner={user._id === item.owner}
                  favoriteUnfavorite={favoriteUnFavorite}
                  big={false}
                  onPress={() => {
                    navigation.navigate('AdvertisementDetailStack', {
                      screen: 'AdvertisementDetailScreen',
                      params: {
                        id: item._id,
                      },
                    });
                  }}
                />
              )}
            />
            <FilterModal
              isVisible={filterModalVisible}
              setVisible={setFilterModalVisible}
              filter={filter}
            />
          </>
        )}
      </View>
    );
  }
};

export default Home;
