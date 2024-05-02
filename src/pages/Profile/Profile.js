import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import {Button} from '@components';

import styles from './Profile.style.js';
import {COLORS, CONSTANTS} from '@utils';

import Storage from '@utils/Storage.js';
import { useUser } from '../../context/UserProvider.js';

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

const Profile = () => {

  const {user,setUser} = useUser()


  const dummyUser = {
    imageURL: 'https://randomuser.me/api/portraits/men/71.jpg',
    name: 'John Doe',
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: dummyUser.imageURL}} style={styles.image} />
      <Text style={styles.name}>{dummyUser.name}</Text>

      <Button
        onPress={() => console.log('Profil düzenle')}
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
        onPress={ async () => {
          await Storage.removeData('token')
          setUser(null)
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
