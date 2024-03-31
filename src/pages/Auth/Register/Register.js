import {Button, Input} from '@components';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import styles from './Register.style'
import { CONSTANTS } from '@utils';

const initialValues = {
  nameSurname: '',
  email: '',
  phone: '',
  password: '',
  repassword: '',
};

const handleSubmit = user => {
  console.log(user);
};

// validation ekle

const Register = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.formContainer} >
      <Text style={styles.appName} >{CONSTANTS.APP_NAME}</Text>
      <View style={styles.title} />
      <Formik
        initialValues={initialValues}
        onSubmit={user => handleSubmit(user)}>
        {({handleChange, handleSubmit, values}) => (
          <>
            <Input
              label={'Ad Soyad'}
              onChangeText={handleChange('nameSurname')}
              value={values.nameSurname}
            />
            <Input
              label={'E-posta Adresi'}
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType='email-address'
            />
            <Input
              label={'Telefon Numarası'}
              onChangeText={handleChange('phone')}
              value={values.phone}
              keyboardType='number-pad'
            />
            <Input
              label={'Şifre'}
              onChangeText={handleChange('password')}
              value={values.password}
              secret={true}
            />
            <Input
              label={'Şifre Tekrar'}
              onChangeText={handleChange('repassword')}
              value={values.repassword}
              secret={true}
            />
            <Button 
                onPress={handleSubmit}
                label='KAYIT OL'
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Register;
