import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {Advertisements, EmailValidation} from '@pages';

import {useUser} from '../../context/UserProvider';
import {Button, Input, AdvertisementCard, Animation} from '@components';

import {mockAdvertisements} from '@utils/mockData';
import {getAllAdvertisementAPI} from '../../services/advertisementServices';
import { showFlashMessage } from 'react-native-flash-message';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);
  const {user} = useUser();

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("focused")
      getAllAdvertisements();
    }) 
    return unsubscribe;
  }, []);

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Input
            placeholder="İlan ara.."
            onChangeText={value => setSearch(value)}
            additionalStyles={{outerContainer: {flex: 1}}}
            onSubmitEditing={() => console.log('Edit finished!')}
          />

          <Button
            onPress={() => console.log('Filtreleme Modal Aç')}
            icon={{name: 'filter', color: 'white', size: 24}}
          />
        </View>

        {loading ? (
          <Animation animationName={'loading'} />
        ) : (
          <FlatList
            data={advertisements}
            keyExtractor={(item, index) => item._id}
            numColumns={2}
            renderItem={({item}) => (
              <AdvertisementCard
                advertisement={item}
                isOwner={user === item.owner}
                big={false}
                onPress={() => {
                  navigation.navigate('AdvertisementDetailScreen', {
                    id: item._id,
                  });
                }}
              />
            )}
          />
        )}
      </View>
    );
  }
};

export default Home;
