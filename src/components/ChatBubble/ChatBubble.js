import React from 'react';
import {View, Text} from 'react-native';

import styles from './ChatBubble.style';

const ChatBubble = ({owner}) => {
  
  const bubbleContainer = owner ? styles.bubbleContainer_right : styles.bubbleContainer_left   
  const bubble = owner ? styles.bubble_right : styles.bubble_left


  return (
    <View style={bubbleContainer}>
      <View style={bubble}>
        <Text style={styles.messageOwner}>Ben</Text>
        <Text style={styles.message}>
          Officia ut culpa aliqua occaecat culpa consectetur dolor sint irure.{' '}
        </Text>
        <Text style={styles.messageDate}>19:06 AM</Text>
      </View>
    </View>
  );
};

export default ChatBubble;
