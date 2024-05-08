import React, { useState } from 'react';
import {View, Text, Image, Pressable, ScrollView} from 'react-native';

// Style
import styles from './Login.style';

// Utils
import {CONSTANTS} from '@utils';

// Components
import {Input, Button, Animation} from '@components';

// Assets
import LoginVector from '@assets/images/login_vector.png';

// Formik & Validations
import { Formik } from 'formik';
import { LoginSchema } from '@utils/validationSchemas';

// Login service
import { getUser, login } from '../../../services/userServices'

// FlashMessage
import { getUserFromToken, showFlashMessage } from '@utils/functions';

// Storage
import Storage from '@utils/Storage';
import { useUser } from '../../../context/UserProvider';

const Login = ({navigation}) => {

  const [loading,setLoading] = useState(false)
  const { setUser } = useUser()

  const handleLogin = async (values) => {
    setLoading(true)
    const response = await login(values);
    if(response.status.toString().startsWith('2')) {
      await Storage.storeData('token', response.data)
      const user = await getUserFromToken()
      setUser(user)
    }
    else {
      showFlashMessage(response.status,response.message)
    }
    
    setLoading(false)
  }


  return (
    <ScrollView
      style={{height: '100%'}}
      contentContainerStyle={styles.container}>
      <Text style={styles.appName}>{CONSTANTS.APP_NAME}</Text>
      <Text style={styles.appSlogan}>{CONSTANTS.APP_SLOGAN}</Text>

      <Image source={LoginVector} style={styles.vectorImage} />

      <Formik
        initialValues={{
          emailAddress: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => handleLogin(values)}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Input
              placeholder="E-posta Adresi"
              onChangeText={handleChange('emailAddress')}
              errors={touched.emailAddress && errors.emailAddress && errors.emailAddress}
              value={values.emailAddress}
            />
            <Input
              placeholder="Şifre"
              secret={true}
              value={values.password}
              onChangeText={handleChange('password')}
              errors={touched.password && errors.password && errors.password}
            />
            <Button label="Giriş Yap" onPress={handleSubmit} loading={loading} />
          </View>
        )}
      </Formik>

      <View style={styles.createAccountLabelContainer}>
        <Text style={styles.createAccountLabel} >Hesabın yok mu?</Text>
        <Text style={styles.createAccountLabelButton} onPress={() => navigation.navigate("RegisterScreen")} >{'\t'}Kayıt Ol</Text>
      </View>

      <Pressable onPress={() => navigation.navigate("ForgotScreen")}>
        <Text style={styles.forgotPasswordLabel}>Şifremi Unuttum</Text>
      </Pressable>
    </ScrollView>
  );

  
};

export default Login;
