import moment from 'moment';
import 'moment/locale/tr';
import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import { getStyles } from './ChatBubble.style';

import {getUser} from '../../services/userServices';
import {useUser} from '../../context/UserProvider';
import { CONSTANTS } from '@utils';

// Gönderen kişinin mesajı sağda olmalı, diğerininki solda

const ChatBubble = ({isOwner, messageDetails, theme}) => {

  const styles = getStyles(theme)

  const bubbleContainer = isOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;
  const bubble = isOwner ? styles.bubble_right : styles.bubble_left;

  const [owner, setOwner] = useState(null);
  const {user} = useUser();
  const {createDate, sender, message} = messageDetails;

  const formattedDate = moment(createDate, "M/D/YYYY, h:mm:ss A")
  .locale('tr')
  .format('DD MMMM YYYY, HH:mm');


  useEffect(() => {
    getUser(sender, user.token).then(response => {
      setOwner(response.data);
    });
  }, []);

  if (owner) {
    return (
      <View style={bubbleContainer}>
        <View style={bubble}>
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: CONSTANTS.margin.L1}}>
            <Image source={owner.imageURL ? { uri: owner.imageURL } : require('@assets/images/avatar.png')} style={{width: 40, height: 40, borderRadius: 20}}/>
            <Text style={styles.messageOwner}>{owner.nameSurname}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.messageDate}>{formattedDate}</Text>
        </View>
      </View>
    );
  }
};

export default ChatBubble;
