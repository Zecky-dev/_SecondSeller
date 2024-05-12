import moment from 'moment';
import 'moment/locale/tr';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Linking,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getStyles} from './ChatBubble.style';

import {CONSTANTS} from '@utils';

import {useUser} from '../../context/UserProvider';

const ChatBubbleMap = ({latitude, longitude}) => {
  const openMap = () => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <Pressable
      onPress={() => openMap()}
      style={{flexDirection: 'row', alignItems: 'centers'}}>
      <Icon name="map-marker" size={18} color={'red'} />
      <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
        Konumu Göster
      </Text>
    </Pressable>
  );
};

const ChatBubble = ({
  user: User,
  messageDetails,
  theme,
  isOwner,
  removeMessage,
}) => {
  const {user} = useUser();

  const styles = getStyles(theme);
  const {createDate, message, isLocation, sender} = messageDetails;
  const [location] = useState(isLocation ? JSON.parse(message) : null);

  const bubbleContainer = isOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;
  const bubble = isOwner ? styles.bubble_right : styles.bubble_left;

  const formattedDate = moment(createDate, 'M/D/YYYY, h:mm:ss A')
    .locale('tr')
    .format('DD MMMM YYYY, HH:mm');

  return (
    <Pressable
      style={bubbleContainer}
      onLongPress={() => {
        if (sender === user._id) {
          Alert.alert(
            'Emin misiniz?',
            'Bu mesajı silmek istediğinize emin misiniz?',
            [
              {
                text: 'Evet',
                onPress: () => removeMessage(messageDetails),
              },
              {
                text: 'Hayır',
                onPress: () => console.log('Messsage deleting cancelled!'),
              },
            ],
          );
        }
      }}>
      <View style={bubble}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: CONSTANTS.margin.L1,
          }}>
          <Image
            source={
              User.imageURL
                ? {uri: User.imageURL}
                : require('@assets/images/avatar.png')
            }
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <Text style={styles.messageOwner}>{User.nameSurname}</Text>
        </View>
        {isLocation ? (
          <ChatBubbleMap
            latitude={location?.latitude}
            longitude={location?.longitude}
            username={User.nameSurname}
          />
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
        <Text style={styles.messageDate}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
};

export default ChatBubble;
