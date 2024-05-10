import moment from 'moment';
import 'moment/locale/tr';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import styles from './ChatBubble.style';

import {getUser} from '../../services/userServices';
import {useUser} from '../../context/UserProvider';

// Gönderen kişinin mesajı sağda olmalı, diğerininki solda

const ChatBubble = ({isOwner, messageDetails}) => {
  const bubbleContainer = isOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;
  const bubble = isOwner ? styles.bubble_right : styles.bubble_left;

  const [owner, setOwner] = useState(null);
  const {user} = useUser();
  const {createDate, sender, message} = messageDetails;

  console.log(createDate)

  const formattedDate = moment(createDate, "M/D/YYYY, h:mm:ss A")
  .add(15, 'hours')
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
          
          <Text style={styles.messageOwner}>{owner.nameSurname}</Text>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.messageDate}>{formattedDate}</Text>
        </View>
      </View>
    );
  }
};

export default ChatBubble;
