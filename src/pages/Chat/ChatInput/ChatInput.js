import {COLORS, CONSTANTS} from '@utils';
import React, {useRef, useState} from 'react';
import {TextInput, Pressable, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStyles} from './ChatInput.style';
import {getCurrentLocation} from '../../../utils/functions';

const ChatInput = ({sendMessage, roomID, senderID, theme}) => {
  const inputRef = useRef();
  const styles = getStyles(theme);
  const [messageContent, setMessageContent] = useState('');

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
