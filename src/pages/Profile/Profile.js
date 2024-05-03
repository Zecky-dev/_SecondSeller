import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import {Button} from '@components';

import styles from './Profile.style.js';
import {COLORS, CONSTANTS} from '@utils';

import Storage from '@utils/Storage.js';
import {useUser} from '../../context/UserProvider.js';

const profileButtonStyle = {
  container: {
    width: '90%',
    backgroundColor: 'transparent',
    borderWidth: CONSTANTS.borderWidth.thin,
    borderColor: COLORS.black,
  },
  label: {
    marginLeft: CONSTANTS.margin.L1,
    color: COLORS.black,
    fontSize: CONSTANTS.fontSize.L4,
  },
};

const Profile = ({navigation}) => {
  const {user, setUser} = useUser();

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
          color: COLORS.black,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Profil Düzenle"
        additionalStyles={profileButtonStyle}
      />

      <Button
        onPress={() => console.log('Profil düzenle')}
        icon={{
          name: 'theme-light-dark',
          color: COLORS.black,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Tema Değiştir"
        additionalStyles={profileButtonStyle}
      />

      <Button
        onPress={async () => {
          await Storage.removeData('token');
          setUser(null);
        }}
        icon={{
          name: 'logout',
          color: COLORS.black,
          size: CONSTANTS.fontSize.L5,
        }}
        label="Çıkış Yap"
        additionalStyles={profileButtonStyle}
      />
    </View>
  );
};

export default Profile;
