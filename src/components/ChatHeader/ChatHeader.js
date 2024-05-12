import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {makePhoneCall} from '@utils/functions';
import {getStyles} from './ChatHeader.style';
import {useTheme} from '../../context/ThemeContext';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserProvider'

const ChatHeader = ({receiver, sender, title, blockUser}) => {

  const { _id: id, phoneNumber } = receiver  

  const { user } = useUser()

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.advertisementName}>{title}</Text>
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
          onPress={() => {
            blockUser(user._id, id)
            navigation.goBack()
          }}
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
