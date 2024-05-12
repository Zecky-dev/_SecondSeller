import React from 'react';
import { Formik } from 'formik';
import { Button, Input } from '@components';
import { showFlashMessage } from '@utils/functions';
import { UpdatePasswordSchema } from '@utils/validationSchemas';
import { updatePassword } from '../../../../services/userServices';
import { View,Image } from 'react-native';

import { getStyles } from './UpdatePassword.style';
import { useTheme } from '../../../../context/ThemeContext';

import PasswordChangeDark from '@assets/images/password_change_dark.png'
import PasswordChangeLight from '@assets/images/password_change_light.png'


const UpdatePassword = ({ navigation, route }) => {

    const { emailAddress  } = route.params;
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const PasswordChangeVector = theme === "dark" ? PasswordChangeDark : PasswordChangeLight

    return (
        <View style={styles.container}>
            <Image style={styles.vectorImage} source={PasswordChangeVector}/>
            <Formik
                initialValues={{
                    newPassword: '',
                    newPasswordConfirm: '',
                }}
                validationSchema={UpdatePasswordSchema}
                onSubmit={async values => {

                    const response = await updatePassword(emailAddress, values.newPassword);
                    if(response.status==200){
                        navigation.navigate('LoginScreen');
                    }

                }}>
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <>
                        <Input
                            label={'Yeni Şifre'}
                            onChangeText={handleChange('newPassword')}
                            value={values.newPassword}
                            errors={
                                touched.newPassword && errors.newPassword && errors.newPassword
                            }
                            secret={true}
                        />
                        <Input
                            label={'Yeni Şifre Tekrar'}
                            onChangeText={handleChange('newPasswordConfirm')}
                            value={values.newPasswordConfirm}
                            errors={
                                touched.newPasswordConfirm &&
                                errors.newPasswordConfirm &&
                                errors.newPasswordConfirm
                            }
                            secret={true}
                        />
                        <Button label="GÜNCELLE" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
    );
};

export default UpdatePassword;
