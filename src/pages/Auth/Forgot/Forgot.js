import React, { useState } from 'react';
import { View, Text, Image, } from 'react-native';
import { Formik } from 'formik';
import { EmailSchema } from '@utils/validationSchemas';
import ForgotVector from '@assets/images/forgotPass.png';
//Style
import styles from './Forgot.style';

import { findUserByEmailAddress } from '../../../services/userServices';

// Components
import { Input, Button, Animation } from '@components';

// Flashmessage
import { showFlashMessage } from '@utils/functions';

//import { sendEmailVerification, forgotPassword } from '../../../services/userServices';

const Forgot = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState("")

    if (!loading) {
        return (

            <View style={styles.container}>

                <Image source={ForgotVector} style={styles.vectorImage} />

                <Formik
                    initialValues={{
                        emailAddress: '',
                    }}
                    validationSchema={EmailSchema}
                    onSubmit={async values => {
                        const response = await findUserByEmailAddress(values)
                        navigation.navigate('EmailVerificationScreen', { verificationCode: response.data, user: { emailAddress: values.emailAddress }, type: 'forgotPassword' })
                    }}
                >
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

                            <Button label="Email Yolla" onPress={handleSubmit} loading={loading} />
                        </View>
                    )}
                </Formik>

            </View>

        )
    }
    else {
        return <Animation animationName={"loading"} />
    }

}

export default Forgot;