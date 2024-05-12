// React & Components
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Util functionss
import {makePhoneCall} from '@utils/functions';

// Styling
import {getStyles} from './ChatHeader.style';
import {useTheme} from '../../context/ThemeContext';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';

// Context & Hooks
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../context/UserProvider';

const ChatHeader = ({receiver, title, blockUser}) => {
  const {_id: id, phoneNumber} = receiver;
  const {user, setUser} = useUser();

  // styling
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  // navigation hook
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.advertisementName}>{title}</Text>
      <View style={{flexDirection: 'row'}}>
        {/* Telefon aramasına yönlendirir */}
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
        {/* Kullanıcı bloklu değilse bloklar, bloklu ise bloğunu kaldırır */}
        <TouchableOpacity
          onPress={async () => {
            const updatedUser = await blockUser(user._id, id);
            setUser({...updatedUser.data, token: user.token});
            navigation.goBack();
          }}
          style={styles.button}
          activeOpacity={0.7}>
          <Icon
            name={user.blocked.includes(id) ? 'account-cancel' : 'cancel'}
            size={CONSTANTS.fontSize.L6}
            color={COLORS.titleColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
