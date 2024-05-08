import React from 'react';
import {View, Text} from 'react-native';

import styles from './ChatBubble.style';

const ChatBubble = ({isOwner, messageDetails}) => {
  const bubbleContainer = isOwner
    ? styles.bubbleContainer_right
    : styles.bubbleContainer_left;
  const bubble = isOwner ? styles.bubble_right : styles.bubble_left;

  const {id, date, owner, message} = messageDetails;

  return (
    <View style={bubbleContainer}>
      <View style={bubble}>
        <Text style={styles.messageOwner}>{owner}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.messageDate}>{date}</Text>
      </View>
    </View>
  );
};

export default ChatBubble;
