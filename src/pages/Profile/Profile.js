import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, Switch} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button} from '@components';

import {getStyles} from './Profile.style.js';
import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors.js';

import Storage from '@utils/Storage.js';
import {useUser} from '@context/UserProvider.js';
import {useTheme} from '@context/ThemeContext';
import {
  createToken,
  deleteToken,
} from '@services/firebaseNotificationServices.js';

const Profile = ({navigation}) => {
  const {user, setUser} = useUser();
  const {theme, setTheme} = useTheme();
  const [notificationPermission, setNotificationPermission] = useState(null);
  const styles = getStyles(theme);
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;

  // Mevcut bildirim izni durumunu Storage'dan alma
  useEffect(() => {
    Storage.getData('notificationPermission').then(response => {
      if (response === null) {
        Storage.storeData('notificatioPermission', 'true').then(() =>
          setNotificationPermission(true),
        );
      } else {
        setNotificationPermission(JSON.parse(response));
      }
    });
  }, []);

  const changeNotificationPermission = () => {
    const newNotificationPermission = !notificationPermission;

    if (newNotificationPermission) {
      createToken();
    } else {
      deleteToken();
    }

    Storage.storeData(
      'notificationPermission',
      JSON.stringify(newNotificationPermission),
    ).then(() => setNotificationPermission(newNotificationPermission));
  };

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
        label="Sohbetlerim"
        additionalStyles={styles.profileButtonStyle}
      />

      <Button
        onPress={() => {
          const newTheme = theme === 'dark' ? 'light' : 'dark';
          Storage.storeData('theme', newTheme);
          setTheme(newTheme);
        }}
        icon={{
          name: 'theme-light-dark',
          color: COLORS.textColor,
          size: CONSTANTS.fontSize.L5,
        }}
        label={`Tema: ${theme === 'dark' ? 'Karanlık' : 'Aydınlık'}`}
        additionalStyles={styles.profileButtonStyle}
      />

      <Pressable
        style={styles.switch}
        onPress={() => changeNotificationPermission()}>
        <Icon
          name={notificationPermission ? 'bell' : 'bell-off'}
          size={24}
          color={COLORS.textColor}
        />
        <Text style={styles.switchLabel}>Bildirimler</Text>
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          thumbColor={'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => changeNotificationPermission()}
          value={notificationPermission}
        />
      </Pressable>

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
