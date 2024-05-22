import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
const {height, width} = Dimensions.get('window');

import {Slider, Button, Animation} from '@components';
import OfferModal from './components/OfferModal/OfferModal';
import FullScreenImageModal from './components/FullScreenImageModal/FullScreenImageModal';

import THEMECOLORS from '@utils/colors';
import {showFlashMessage} from '@utils/functions';

import {getStyles} from './AdvertisementDetail.style';

import {
  getAdvertisementAPI,
  removeAdvertisement,
} from '@services/advertisementServices';
import {getSenderReceiverData, getUser} from '@services/userServices';

import {useUser} from '@context/UserProvider';
import {useTheme} from '@context/ThemeContext';

import {showMessage} from 'react-native-flash-message';

import {checkChatRoom, createMessage} from '@services/firebaseChatService';

const AdvertisementDetail = ({route, navigation}) => {
  const {id: advertisementID} = route.params;
  const {
    user: {token, _id: userID},
  } = useUser();

  const markerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [fullScreenImageModalVisible, setFullScreenImageModalVisible] =
    useState(false);
  const [advertisement, setAdvertisement] = useState(null);
  const [advertisementOwner, setAdvertisementOwner] = useState(null);

  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  const styles = getStyles(theme);

  const getAdvertisement = async () => {
    try {
      setLoading(true);
      const advertisementData = (
        await getAdvertisementAPI(advertisementID, token)
      ).data;
      const advertisementOwnerData = await getAdvertisementOwner(
        advertisementData.owner,
      );
      if (advertisementData && advertisementOwnerData) {
        setAdvertisement(advertisementData);
        setAdvertisementOwner(advertisementOwnerData);
      }

      setLoading(false);
    } catch (err) {
      showMessage({
        message: 'İlan getirilirken bir hata meydana geldi!',
        type: 'danger',
      });
    }
    setLoading(false);
  };

  const getAdvertisementOwner = async id => {
    try {
      const response = await getUser(id, token);
      return response.data;
    } catch (err) {
      console.log(err)
      showMessage({
        message: 'İlan sahibi getirilirken bir hata meydana geldi!',
        type: 'danger',
      });
      return null;
    }
  };

  useEffect(() => {
    getAdvertisement();
  }, []);

  const sendOffer = async price => {
    setOfferModalVisible(false);
    const roomID = await checkChatRoom(
      advertisementID,
      userID,
      advertisement.owner,
    );
    const messageDetails = {
      sender: userID,
      message: `Teklifim: ${price} TL`,
      createDate: new Date().toLocaleString(),
      isLocation: false,
    };
    createMessage(roomID, messageDetails);
    showFlashMessage(200, 'Teklif gönderildi!');
  };

  /*
      Kullanıcı sohbet başlatır veya teklif gönderirse ChatScreen'e yönlendirlir,
      Eğer price değeri gönderilirse bir mesaj gönderme işlemi gerçekleştirilir ve ardından sayfa yönlendirmesi yapılır
  */
  const startChat = async (price = null, owner, advertisementID, title) => {
    const {receiver, sender} = await getSenderReceiverData(
      userID,
      owner,
      token,
    );

    if (!receiver.blocked.includes(sender._id)) {
      if (price) {
        await sendOffer(price);
      }

      navigation.navigate('ChatScreen', {
        advertisementID,
        senderID: userID,
        receiverID: owner,
        receiver,
        sender,
        title,
      });
    } else {
      showMessage({
        message: 'Bu kullanıcı tarafından bloklandınız!',
        type: 'danger',
      });
    }
  };

  if (advertisement && advertisementOwner && !loading) {
    const {
      _id: id,
      title,
      description,
      images,
      owner,
      category,
      location,
      price,
    } = advertisement;

    const LONGITUDE = location.longitude;
    const LATITUDE = location.latitude;
    const LATITUDE_DELTA = 0.03;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

    return (
      <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* Slider */}
          <Slider
            images={images}
            onPress={() => setFullScreenImageModalVisible(true)}
          />

          {/* İlan sahibi ile ilgili bilgiler */}
          <Pressable
            style={styles.ownerContainer}
            onPress={() => {
              if (advertisementOwner._id === userID) {
                navigation.navigate('AdvertisementsScreen', {
                  screen: 'Advertisements',
                });
              } else {
                navigation.navigate('OwnerProfileScreen', {
                  screen: 'OwnerProfileStackScreen',
                  params: {advertisementOwner},
                });
              }
            }}>
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
          </Pressable>

          {/* Slider Altındaki Açıklamalar */}
          <View style={styles.namePriceContainer}>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.price}>{price} TL</Text>
          </View>

          {/* İlan açıklaması */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/* İlan Konumunun Görüntülenmesi */}

          <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onMapReady={() => {
              if (markerRef && markerRef.current) {
                markerRef.current.showCallout();
              }
            }}
            zoomEnabled={false}
            scrollEnabled={false}
            style={{
              width: '100%',
              height: 250,
            }}>
            <Marker
              ref={markerRef}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              key={id}
              style={{width: 26, height: 40}}
              resizeMode="contain"
              title="İlanın konumu."
            />
          </MapView>

          {owner !== userID && (
            <View style={{flexDirection: 'row'}}>
              <Button
                icon={{
                  name: 'chat',
                  color: COLORS.titleColor,
                  size: 24,
                }}
                label="Sohbet Başlat"
                additionalStyles={{
                  container: {
                    flex: 1,
                  },
                }}
                onPress={async () =>
                  await startChat(null, owner, advertisementID, title)
                }
              />
              <Button
                icon={{
                  name: 'offer',
                  color: COLORS.titleColor,
                  size: 24,
                }}
                additionalStyles={{
                  container: {
                    flex: 1,
                  },
                }}
                label="Teklif Ver"
                onPress={() => setOfferModalVisible(true)}
              />
            </View>
          )}

          {owner === userID && (
            <Button
              label="İlanı Sil"
              icon={{name: 'trash-can', size: 24, color: COLORS.titleColor}}
              onPress={() => {
                Alert.alert(
                  'Emin misiniz ?',
                  'Bu ilanı silmek istediğinize emin misiniz ?',
                  [
                    {
                      text: 'Evet',
                      onPress: async () => {
                        await removeAdvertisement(id, token);
                        navigation.goBack();
                      },
                    },
                    {
                      text: 'Hayır',
                      onPress: () =>
                        console.log('Removing advertisement cancelled!'),
                      style: 'cancel',
                    },
                  ],
                );
              }}
            />
          )}
        </ScrollView>
        <OfferModal
          isVisible={offerModalVisible}
          setVisible={setOfferModalVisible}
          price={price}
          sendOffer={price => startChat(price, owner, advertisementID, title)}
        />
        <FullScreenImageModal
          isVisible={fullScreenImageModalVisible}
          setVisible={setFullScreenImageModalVisible}
          images={images}
        />
      </View>
    );
  } else {
    return <Animation animationName={'loading'} />;
  }
};

export default AdvertisementDetail;
