import React from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';

// Style
import styles from './Login.style';

// Utils
import {CONSTANTS} from '@utils';

// Components
import {Input, Button} from '@components';

// Assets
import LoginVector from '@assets/images/login_vector.png';

import {Formik} from 'formik';
import {LoginSchema} from '@utils/validationSchemas';

const Login = ({navigation}) => {
  return (
    <ScrollView
      style={{height: '100%'}}
      contentContainerStyle={styles.container}>
      <Text style={styles.appName}>{CONSTANTS.APP_NAME}</Text>
      <Text style={styles.appSlogan}>{CONSTANTS.APP_SLOGAN}</Text>

      <Image source={LoginVector} style={styles.vectorImage} />

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => console.log('Login', values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Input
              placeholder="E-posta Adresi"
              onChangeText={handleChange('email')}
              errors={touched.email && errors.email && errors.email}
            />
            <Input
              placeholder="Şifre"
              secret={true}
              onChangeText={handleChange('password')}
              errors={touched.password && errors.password && errors.password}
            />
            <Button label="Giriş Yap" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      <View style={styles.createAccountLabelContainer}>
        <Text style={styles.createAccountLabel} >Hesabın yok mu?</Text>
        <Text style={styles.createAccountLabelButton} onPress={() => navigation.navigate("RegisterScreen")} >{'\t'}Kayıt Ol</Text>
      </View>

      <Pressable onPress={() => console.log('Şifremi unuttum')}>
        <Text style={styles.forgotPasswordLabel}>Şifremi Unuttum</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Login;
