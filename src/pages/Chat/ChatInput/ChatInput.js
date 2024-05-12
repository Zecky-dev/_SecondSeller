import {COLORS, CONSTANTS} from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import {TextInput, Pressable, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStyles} from './ChatInput.style';
import {getCurrentLocation, locationPermissionGranted} from '../../../utils/functions';
import { showMessage } from 'react-native-flash-message';

const ChatInput = ({sendMessage, senderID, theme, message}) => {
  const inputRef = useRef();
  const styles = getStyles(theme);

  const [messageContent, setMessageContent] = useState(message);

  useEffect(() => {
    setMessageContent(message)
  },[message])


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
          const locationPermission = await locationPermissionGranted()
          if(locationPermission) {
            const location = await getCurrentLocation();
            const message = JSON.stringify(location);
            sendMessage(message, true);
            inputRef.current.clear()  
          }
          else {
            showMessage({
              type: "warning",
              message: "Konum izni vermediniz, ayarlardan konum iznini aktif hale getirin."
            })
          }
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
