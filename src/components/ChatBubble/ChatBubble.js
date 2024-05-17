import moment from 'moment';
import 'moment/locale/tr';
import React, {useState} from 'react';
import {View, Text, Image, Pressable, Alert} from 'react-native';

import {getStyles} from './ChatBubble.style';

import {CONSTANTS} from '@utils';
import {MapBubble} from '@components';

// Gönderen kişinin mesajı sağda olmalı, diğerininki solda

const ChatBubble = ({
  user,
  messageDetails,
  theme,
  isMessageOwner,
  removeMessage,
}) => {
  const styles = getStyles(theme);
  console.log(messageDetails)
  const {createDate, message, isLocation, sender} = messageDetails;
  const [location] = useState(isLocation ? JSON.parse(message) : null);

  const bubbleContainer = isMessageOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;
  const bubble = isMessageOwner ? styles.bubble_right : styles.bubble_left;

  const formattedDate = moment(createDate, 'DD.MM.YYYY HH:mm:ss')
  .locale('tr')
  .format('DD MMMM YYYY, HH:mm');

  return (
    <Pressable
      style={bubbleContainer}
      onLongPress={() => {
        if (isMessageOwner) {
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
              user.imageURL
                ? {uri: user.imageURL}
                : require('@assets/images/avatar.png')
            }
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <Text style={styles.messageOwner}>{user.nameSurname}</Text>
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
