import {COLORS, CONSTANTS} from '@utils';
import React from 'react';
import {TextInput, Pressable,View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ChatInput.style'

const ChatInput = ({onChangeText, createMessage, roomID ,senderID}) => {
  return (
    <View style={styles.container}>
      <TextInput
      onChangeText={onChangeText}
      placeholder={"Mesajınız..."}
      style={styles.input}
      onSubmitEditing={(event) => {
        const messageContent = event.nativeEvent.text;
        if(messageContent.trim() !== "") {
          const message = {sender: senderID, message: messageContent, createDate: new Date().toLocaleString()}
          createMessage(roomID, message)
        }
      }}
      />
      <Pressable onPress={() => console.log("Konum paylaş")}>
        <Icon name='map-marker-circle' color={COLORS.black} size={CONSTANTS.fontSize.L6}/>  
      </Pressable>  
      <Pressable onPress={() => console.log("Mesaj Gönder")}>
        <Icon name='send-circle-outline' color={COLORS.black} size={CONSTANTS.fontSize.L6}/>  
      </Pressable>  
    </View>
  );
};

export default ChatInput
