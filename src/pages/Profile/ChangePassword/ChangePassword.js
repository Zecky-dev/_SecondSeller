import React from 'react';

import {Formik} from 'formik';
import {Button, Input} from '@components';
import {ChangePasswordSchema} from '@utils/validationSchemas';
import {changePassword} from '../../../services/userServices';
import {useUser} from '../../../context/UserProvider';
import Storage from '@utils/Storage';
import {showFlashMessage} from '@utils/functions';

const ChangePassword = ({navigation}) => {
  const {user} = useUser();
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={async values => {
        const response = await changePassword(user._id, values);
        const token = response.data;
        showFlashMessage(response.status, response.message);
        if (token) {
          await Storage.storeData('token', token);
          navigation.goBack();
        }
      }}>
      {({handleSubmit, handleChange, values, errors, touched}) => (
        <>
          <Input
            label={'Mevcut Şifre'}
            onChangeText={handleChange('oldPassword')}
            value={values.oldPassword}
            errors={
              touched.oldPassword && errors.oldPassword && errors.oldPassword
            }
            secret={true}
          />
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
  );
};

export default ChangePassword;
