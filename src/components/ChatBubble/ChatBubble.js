import moment from 'moment';
import 'moment/locale/tr';
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';

import {getStyles} from './ChatBubble.style';

import {CONSTANTS} from '@utils';
import {MapBubble} from '@components';

// Gönderen kişinin mesajı sağda olmalı, diğerininki solda

const ChatBubble = ({user, messageDetails, theme, isOwner}) => {
  const styles = getStyles(theme);
  const {createDate, message, isLocation} = messageDetails;
  const [location, setLocation] = useState(
    isLocation ? JSON.parse(message) : null,
  );

  const bubbleContainer = isOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;
  const bubble = isOwner ? styles.bubble_right : styles.bubble_left;

  const formattedDate = moment(createDate, 'M/D/YYYY, h:mm:ss A')
    .locale('tr')
    .format('DD MMMM YYYY, HH:mm');

  return (
    <View style={bubbleContainer}>
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
    </View>
  );
};

export default ChatBubble;
