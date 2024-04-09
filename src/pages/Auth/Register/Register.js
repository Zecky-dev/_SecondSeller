// Components
import React, { useEffect, useState } from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, Input,Animation} from '@components';

// Styles & Colors
import {COLORS, CONSTANTS} from '@utils';
import styles from './Register.style';

// Forms and Validations
import {Formik} from 'formik';
import {RegisterSchema} from '@utils/validationSchemas';

// Register
import {sendEmailVerification } from '../../../services/userServices';

const initialValues = {
  nameSurname: '',
  emailAddress: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};



// validation ekle

const Register = ({navigation}) => {

  const [loading,setLoading] = useState(false)

  if(!loading) {
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
            onSubmit={ async (user) => {
              setLoading(true)
              const response = await sendEmailVerification(user)
              setLoading(false)
              navigation.navigate('EmailVerificationScreen', { verificationCode: response.data, user } )              
            }}
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
                  onChangeText={handleChange('emailAddress')}
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
  }

  else {
    return <Animation animationName={"test"}/>
  }


  
};

export default Register;
