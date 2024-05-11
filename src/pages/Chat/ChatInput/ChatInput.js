import {COLORS, CONSTANTS} from '@utils';
import React, {useRef, useState} from 'react';
import {TextInput, Pressable, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStyles} from './ChatInput.style';
import {getCurrentLocation} from '../../../utils/functions';

const ChatInput = ({createMessage, roomID, senderID, theme}) => {
  const inputRef = useRef();
  const styles = getStyles(theme);
  const [messageContent, setMessageContent] = useState('');

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

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={value => setMessageContent(value)}
        placeholder={'Mesajınız...'}
        style={styles.input}
        blurOnSubmit={false}
        ref={inputRef}
        clearButtonMode="always"
        onSubmitEditing={event => {
          const messageContent = event.nativeEvent.text;
          if (messageContent.trim() !== '') {
            sendMessage(roomID, messageContent.trim(), false);
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
          sendMessage(roomID, message, true);
        }}
      />
      <Icon
        name="send-circle-outline"
        color={COLORS.black}
        size={CONSTANTS.fontSize.L6}
        onPress={() => {
          if (messageContent.trim() !== '') {
            sendMessage(roomID, messageContent.trim(), false);
          }
        }}
      />
    </View>
  );
};

export default ChatInput;
