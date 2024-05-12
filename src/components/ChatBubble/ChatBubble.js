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
import {MapBubble} from '@components';
import { useUser } from '../../context/UserProvider';

// Gönderen kişinin mesajı sağda olmalı, diğerininki solda

const ChatBubble = ({user, messageDetails, theme, isOwner, removeMessage}) => {
  const styles = getStyles(theme);
  const {createDate, message, isLocation, sender} = messageDetails;
  const [location] = useState(isLocation ? JSON.parse(message) : null);

  const { user : User } = useUser()

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
          <MapBubble
            latitude={location.latitude}
            longitude={location.longitude}
            username={user.nameSurname}
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
