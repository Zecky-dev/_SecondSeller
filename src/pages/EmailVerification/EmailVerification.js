import React, {useState} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import {Button, Input, Animation} from '@components';

import { getStyles } from './EmailVerification.style';

import {register, updateUser} from '../../services/userServices';
import {useUser} from '../../context/UserProvider';
import {useTheme} from '../../context/ThemeContext'
import {getUserFromToken, showFlashMessage} from '@utils/functions';
import Storage from '@utils/Storage';

import EmailValidationDarkVector from '@assets/images/email_validation_dark.png'
import EmailValidationLightVector from '@assets/images/email_validation_dark.png'


const EmailVerification = ({navigation, route}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useUser();
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const EmailValidationVector = theme === "dark" ? EmailValidationDarkVector : EmailValidationLightVector

  const {verificationCode: code, user, type} = route.params;

  // Kullanıcı kayıt işlemi sırasında mail kodunu kontrol eder sonra kullanıcıyı kaydeder
  const checkAndRegister = async () => {
    if (verificationCode === code) {
      setLoading(true);
      const response = await register(user);
      if (response.status.toString().startsWith('2')) {
        await Storage.storeData('token', response.data);
        const user = await getUserFromToken();
        setUser(user);
      } else {
        showFlashMessage(response.status, response.message);
      }
      setLoading(false);
    }
  };

  // Kullanıcı eposta veya telefon numarasını güncellemek isterse önce mail kodunu kontrol eder sonra bilgileri günceller
  const checkAndUpdate = async () => {
    if (verificationCode === code) {
      setLoading(true);
      const response = await updateUser(user.id, user.values);
      if (response.status.toString().startsWith('2')) {
        const user = await getUserFromToken();
        setUser(user);
        navigation.replace('ProfileStackScreen');
      } else {
        showFlashMessage(response.status, response.message);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={EmailValidationVector}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.infoMessage}>
            E-posta adresinize 6 haneli doğrulama kodu gönderildi.
          </Text>
          <Text style={styles.infoMessage}>Lütfen boşluğa giriniz.</Text>
        </View>

        <Input
          placeholder="Doğrulama Kodu"
          onChangeText={val => {
            let numberValue = val.replace(/[^0-9]/g, '');
            setVerificationCode(numberValue);
          }}
          value={verificationCode}
          keyboardType="number-pad"
          maxLength={6}
        />
        <Button
          onPress={() =>
            type == 'register' ? checkAndRegister() : checkAndUpdate()
          }
          label="Doğrula"
        />
      </ScrollView>
    );
  }
};

export default EmailVerification;
