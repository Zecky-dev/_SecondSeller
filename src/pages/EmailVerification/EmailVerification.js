import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import {Button, Input,Animation} from '@components';

import styles from './EmailVerification.style';

import { register } from '../../services/userServices';

const EmailVerification = ({navigation,route}) => {

  const [verificationCode, setVerificationCode] = useState('');
  const [loading,setLoading] = useState(false);

  const { verificationCode : code, user } = route.params;

  const checkAndRegister = async () => {
    if(verificationCode === code) {
      setLoading(true)
      await register(user)
      setLoading(false)
      navigation.navigate('LoginScreen')
    }
  }

  if(loading) {
    return <Animation/>
  }
  else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('@assets/images/emailValidation.png')}
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
        onPress={() => checkAndRegister()}
        label="Doğrula"
      />
    </ScrollView>
    )
  }

};

export default EmailVerification;
