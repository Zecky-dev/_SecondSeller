import {Button, Input} from '@components';
import {Formik} from 'formik';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import styles from './Register.style';
import {COLORS, CONSTANTS} from '@utils';
import {RegisterSchema} from '@utils/validationSchemas';

const initialValues = {
  nameSurname: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

const handleSubmit = user => {
  console.log(user);
};

// validation ekle

const Register = ({navigation}) => {
  return (
    <>
      <Button
        onPress={() => navigation.goBack()}
        icon={{
          name: 'chevron-left',
          size: CONSTANTS.fontSize.L7,
          color: COLORS.black,
        }}
        additionalStyles={{
          container: styles.additionalStylesContainer
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.formContainer}>
        <Text style={styles.appName}>{CONSTANTS.APP_NAME}</Text>
        <View style={styles.title} />
        <Formik
          initialValues={initialValues}
          onSubmit={user => handleSubmit(user)}
          validationSchema={RegisterSchema}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <>
              <Input
                label={'Ad Soyad'}
                onChangeText={handleChange('nameSurname')}
                value={values.nameSurname}
                errors={
                  touched.nameSurname &&
                  errors.nameSurname &&
                  errors.nameSurname
                }
              />
              <Input
                label={'E-posta Adresi'}
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
                errors={touched.email && errors.email && errors.email}
                placeholder="info@secondeseller.com"
              />
              <Input
                label={'Telefon Numarası'}
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
                keyboardType="number-pad"
                errors={
                  touched.phoneNumber &&
                  errors.phoneNumber &&
                  errors.phoneNumber
                }
                placeholder="0555-555-5555"
              />
              <Input
                label={'Şifre'}
                onChangeText={handleChange('password')}
                value={values.password}
                secret={true}
                errors={touched.password && errors.password && errors.password}
              />
              <Input
                label={'Şifre Tekrar'}
                onChangeText={handleChange('passwordConfirm')}
                value={values.passwordConfirm}
                secret={true}
                errors={
                  touched.passwordConfirm &&
                  errors.passwordConfirm &&
                  errors.passwordConfirm
                }
              />
              <Button onPress={handleSubmit} label="KAYIT OL" />
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default Register;
