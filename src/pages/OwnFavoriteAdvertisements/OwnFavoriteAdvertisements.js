// Favori postlar ve kullanıcının favoriye attığı postları gösteren sayfa
import React, {useState, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import THEMECOLORS from '@utils/colors';

// Pages
import Advertisements from './Advertisements';
import {getAdvertisementByUserIdAPI} from '@services/advertisementServices';
import {showMessage} from 'react-native-flash-message';
import {Animation} from '@components';
import {useUser} from '@context/UserProvider';
import {useTheme} from '@context/ThemeContext';

const OwnFavoriteAdvertisements = ({navigation}) => {
  const [ownAdvertisements, setOwnAdvertisements] = useState([]);
  const [favoriteAdvertisements, setFavoriteAdvertisements] = useState([]);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    user: {_id: id, token},
  } = useUser();

  useEffect(() => {
    // Kullanıcının kendi ID'sine sahip olduğu postları
    // Kullanıcının favorilediği postları

    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getAdvertisementByUserIdAPI(id, token)
        .then(response => {
          const {favoriteAdvertisements, ownAdvertisements} = response;
          setOwnAdvertisements(ownAdvertisements);
          setFavoriteAdvertisements(favoriteAdvertisements);
        })
        .catch(err => {
          showMessage({
            message: 'İlanlar getirilirken bir hata meydana geldi!',
            type: 'danger',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    });
    return unsubscribe;
  }, []);

  const renderScene = SceneMap({
    ownAdvertisements: () => (
      <Advertisements advertisements={ownAdvertisements} />
    ),
    favoriteAdvertisements: () => (
      <Advertisements advertisements={favoriteAdvertisements} />
    ),
  });

  const [routes] = useState([
    {key: 'ownAdvertisements', title: 'İlanlarım'},
    {key: 'favoriteAdvertisements', title: 'Favorilerim'},
  ]);

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    );
  }
};

const renderTabBar = props => {
  const {theme} = useTheme();

  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  return (
    <TabBar
      {...props}
      style={{backgroundColor: COLORS.primary}}
      renderIndicator={() => null}
    />
  );
};

export default OwnFavoriteAdvertisements;
