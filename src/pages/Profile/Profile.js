import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import {Button} from '@components';

import { getStyles } from './Profile.style.js';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors.js'

import Storage from '@utils/Storage.js';
import {useUser} from '../../context/UserProvider.js';
import {useTheme} from '../../context/ThemeContext.js'



const Profile = ({navigation}) => {
  const {user, setUser} = useUser();
  const { theme, setTheme } = useTheme()
  const styles = getStyles(theme)
  const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT


  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user.imageURL
            ? user.imageURL
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{user.nameSurname}</Text>

      <Button
        onPress={() => navigation.navigate('ProfileEditScreen')}
        icon={{
          name: 'pencil',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Profil Düzenle"
        additionalStyles={styles.profileButtonStyle}
      />

      <Button
        onPress={() => navigation.navigate('MessagesScreen')}
        icon={{
          name: 'email-fast',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Mesajlarım"
        additionalStyles={styles.profileButtonStyle}
      />

      <Button
        onPress={() => {
          const newTheme = theme === "dark" ? "light" : "dark";
          Storage.storeData('theme',newTheme);
          setTheme(newTheme)
        }}
        icon={{
          name: 'theme-light-dark',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label={`Tema: ${theme === "dark" ? "Karanlık" : "Aydınlık"}`}
        additionalStyles={styles.profileButtonStyle}
      />

      <Button
        onPress={async () => {
          await Storage.removeData('token');
          setUser(null);
        }}
        icon={{
          name: 'logout',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Çıkış Yap"
        additionalStyles={styles.profileButtonStyle}
      />
    </View>
  );
};

export default Profile;
