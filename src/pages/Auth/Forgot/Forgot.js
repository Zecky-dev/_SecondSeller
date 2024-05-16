import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Formik} from 'formik';
import {EmailSchema} from '@utils/validationSchemas';
//Style
import {getStyles} from './Forgot.style';

import {passwordReset} from '@services/userServices';

// Components
import {Input, Button, Animation} from '@components';

// Flashmessage
import {showFlashMessage} from '@utils/functions';

// Vectors
import ForgotPasswordDark from '@assets/images/forgot_password_dark.png';
import ForgotPasswordLight from '@assets/images/forgot_password_light.png';

// Context
import {useTheme} from '@context/ThemeContext';

const Forgot = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const ForgotPasswordVector =
    theme === 'dark' ? ForgotPasswordDark : ForgotPasswordLight;

  if (!loading) {
    return (
      <View style={styles.container}>
        <Image source={ForgotPasswordVector} style={styles.vectorImage} />
        <Formik
          initialValues={{
            emailAddress: '',
          }}
          validationSchema={EmailSchema}
          onSubmit={async values => {
            setLoading(true);
            const response = await passwordReset(values);
            setLoading(false);
            if (response.status !== 200) {
              showFlashMessage(response.status, response.message);
            } else {
              navigation.navigate('EmailVerificationScreen', {
                verificationCode: response.data.data,
                user: {emailAddress: values.emailAddress},
                type: 'forgotPassword',
              });
            }
          }}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View>
              <Input
                placeholder="E-posta Adresi"
                onChangeText={handleChange('emailAddress')}
                errors={
                  touched.emailAddress &&
                  errors.emailAddress &&
                  errors.emailAddress
                }
                value={values.emailAddress}
              />

              <Button label="Gönder" onPress={handleSubmit} loading={loading} />
            </View>
          )}
        </Formik>
      </View>
    );
  } else {
    return <Animation animationName={'loading'} />;
  }
};

export default Forgot;
