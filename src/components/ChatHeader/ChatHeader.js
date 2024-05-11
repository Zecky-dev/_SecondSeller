import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {makePhoneCall} from '@utils/functions';
import {getStyles} from './ChatHeader.style';
import {useTheme} from '../../context/ThemeContext';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

const ChatHeader = ({advertisementDetails, blockUser}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  const phoneNumber = '5059880137';
  const advertisementName = 'İlan ismi';
  const userID = "123456"

  return (
    <View style={styles.container}>
      <Text style={styles.advertisementName}>{advertisementName}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            makePhoneCall(phoneNumber);
          }}
          style={styles.button}
          activeOpacity={0.7}>
          <Icon
            name="phone"
            size={CONSTANTS.fontSize.L6}
            color={COLORS.titleColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Arama')}
          style={styles.button}
          activeOpacity={0.7}>
          <Icon
            name="cancel"
            size={CONSTANTS.fontSize.L6}
            color={COLORS.titleColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
