import React from 'react';
import {View, Text} from 'react-native';

import styles from './ChatBubble.style';

const ChatBubble = ({isOwner,messageDetails}) => {
  

  const bubbleContainer = isOwner ? styles.bubbleContainer_right : styles.bubbleContainer_left   
  const bubble = isOwner ? styles.bubble_right : styles.bubble_left

  const {messageId,message,messageOwner,messageDate} = messageDetails


  return (
    <View style={bubbleContainer}>
      <View style={bubble}>
        <Text style={styles.messageOwner}>{messageOwner}</Text>
        <Text style={styles.message}>
          {message}
        </Text>
        <Text style={styles.messageDate}>{messageDate}</Text>
      </View>
    </View>
  );
};

export default ChatBubble;
