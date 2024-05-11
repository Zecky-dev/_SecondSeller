import {COLORS, CONSTANTS} from '@utils';
import React, { useRef } from 'react';
import {TextInput, Pressable,View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStyles} from './ChatInput.style'

const ChatInput = ({onChangeText, createMessage, roomID ,senderID, theme}) => {

  const inputRef = useRef()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <TextInput
      onChangeText={onChangeText}
      placeholder={"Mesajınız..."}
      style={styles.input}
      blurOnSubmit={false}
      ref={inputRef}
      clearButtonMode='always'
      onSubmitEditing={(event) => {
        const messageContent = event.nativeEvent.text;
        if(messageContent.trim() !== "") {
          const message = {sender: senderID, message: messageContent, createDate: new Date().toLocaleString()}
          createMessage(roomID, message)
          inputRef.current.clear()
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
