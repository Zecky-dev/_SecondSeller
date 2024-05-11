import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {getStyles} from './MessageCard.style';
import {useTheme} from '../../context/ThemeContext';

const MessageCard = ({onPress, message}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      <Image
        source={
          message.imageURL
            ? {uri: message.imageURL}
            : require('@assets/images/avatar.png')
        }
        style={styles.image}
      />
      <Text style={styles.name}>{message.nameSurname}</Text>
    </TouchableOpacity>
  );
};

export default MessageCard;
