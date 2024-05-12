import {COLORS, CONSTANTS} from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import {TextInput, Pressable, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStyles} from './ChatInput.style';
import {getCurrentLocation} from '../../../utils/functions';

<<<<<<< HEAD
const ChatInput = ({sendMessage, roomID, senderID, theme}) => {
=======
const ChatInput = ({createMessage, roomID, senderID, theme, message}) => {
>>>>>>> 5363fc7ec351b741a99f673009b5fc887efa6d4e
  const inputRef = useRef();
  const styles = getStyles(theme);
  const [messageContent, setMessageContent] = useState(message);

<<<<<<< HEAD
=======
  const sendMessage = (roomID, messageContent, isLocation) => {
    const message = {
      sender: senderID,
      message: messageContent,
      createDate: new Date().toLocaleString(),
      isLocation,
    };
    createMessage(roomID, message);
    inputRef.current.clear();
  };

  useEffect(() => {
    setMessageContent(message);
  }, [message]);

>>>>>>> 5363fc7ec351b741a99f673009b5fc887efa6d4e
  return (
    <View style={styles.container}>
      <TextInput
        value={messageContent}
        onChangeText={value => setMessageContent(value)}
        placeholder={'Mesajınız...'}
        style={styles.input}
        blurOnSubmit={false}
        ref={inputRef}
        clearButtonMode="always"
        onSubmitEditing={event => {
          const messageContent = event.nativeEvent.text;
          if (messageContent.trim() !== '') {
            sendMessage(messageContent.trim(), false);
            inputRef.current.clear()
          }
        }}
      />
      <Icon
        name="map-marker-circle"
        color={COLORS.black}
        size={CONSTANTS.fontSize.L6}
        onPress={async () => {
          const location = await getCurrentLocation();
          const message = JSON.stringify(location);
          sendMessage(message, true);
          inputRef.current.clear()
        }}
      />
      <Icon
        name="send-circle-outline"
        color={COLORS.black}
        size={CONSTANTS.fontSize.L6}
        onPress={() => {
          if (messageContent.trim() !== '') {
            sendMessage(messageContent.trim(), false);
            inputRef.current.clear()
          }
        }}
      />
    </View>
  );
};

export default ChatInput;
