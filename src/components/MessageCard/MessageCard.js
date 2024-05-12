import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {getStyles} from './MessageCard.style';
import {useTheme} from '../../context/ThemeContext';

const MessageCard = ({onPress, message, title}) => {
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
      <View style={{flex: 1}}>
        <Text style={styles.name}>{message.nameSurname}</Text>
        <Text style={styles.advertisementTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MessageCard;
