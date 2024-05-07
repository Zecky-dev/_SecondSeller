import {useUser} from '../../../context/UserProvider';
import React, {useState} from 'react';
import {Image, ScrollView, Pressable, Text, Alert} from 'react-native';

import { getStyles } from './ProfileEdit.style';
import { useTheme } from '../../../context/ThemeContext'

import {UpdateProfileSchema} from '@utils/validationSchemas';
import {Formik} from 'formik';
import {Animation, Button, Input} from '@components';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  getUserFromToken,
  resizeImage,
  showFlashMessage,
} from '@utils/functions';
import {showMessage} from 'react-native-flash-message';
import {
  sendEmailVerification,
  updateUser,
} from '../../../services/userServices';
import {uploadImagesAndGetURLs} from '../../../services/otherServices';
import Storage from '@utils/Storage';


// Cihazdan resim alma
const takeImageFromGallery = async setFieldValue => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 1,
    selectionLimit: 1,
  });
  // Resim seçme iptal edilmediyse;
  if (!result.didCancel) {
    for (let asset of result.assets) {
      try {
        const resizedImage = await resizeImage(asset, 200, 200);
        if (resizedImage !== null) setFieldValue('imageURL', resizedImage.uri);
      } catch (err) {
        showMessage({
          message: 'Resim seçilirken hata meydana geldi, tekrar deneyiniz!',
          type: 'danger',
        });
        return;
      }
    }
  }
};

const createAlert = (id, values, setUser) => {
  Alert.alert(
    'Hesap Kapatma',
    'Hesabınızı kapatmak istediğinize emin misiniz?',
    [
      {
        text: 'Hayır',
        onPress: () => console.log('Cancel pressed'),
        style: 'cancel',
      },
      {
        text: 'Evet',
        onPress: async () => {
          const response = await updateUser(id, values);
          if (response.status === 200) {
            await Storage.removeData('token');
            if ((await Storage.getData('token')) === null) {
              setUser(null);
            }
          }
        },
      },
    ],
  );
};

const ProfilEdit = ({navigation}) => {
  const {user, setUser} = useUser();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme)

  // Kullanıcı bilgilerini güncelleme
  const handleUpdate = async newUser => {
    setLoading(true);
    let type = '';

    // phoneNumber veya emailAddress güncellendi mi kontrolü
    if (
      user.emailAddress !== newUser.emailAddress &&
      user.phoneNumber !== newUser.phoneNumber
    ) {
      type = 'allUpdate';
    } else if (user.phoneNumber !== newUser.phoneNumber) {
      type = 'phoneNumberUpdate';
    } else if (user.emailAddress !== newUser.emailAddress) {
      type = 'emailAddressUpdate';
    }

    // Kullanıcının profil resminin sistemdeki URL'ini alma
    if (user.imageURL !== newUser.imageURL) {
      const images = [newUser.imageURL];
      const imageURL = (await uploadImagesAndGetURLs(images))[0];
      newUser.imageURL = imageURL;
    }

    // Eğer phoneNumber veya emailAddress güncellenmiş ise yeni değerler sistemde var mı kontorlü yap
    if (type) {
      const response = await sendEmailVerification(newUser, type);
      if (response.status.toString().startsWith('2')) {
        navigation.navigate('ProfileEmailValidationScreen', {
          verificationCode: response.data,
          user: {
            id: user._id,
            values: newUser,
          },
          type: 'update',
        });
      }
      showFlashMessage(response.status, response.message);
    } else {
      const response = await updateUser(user._id, newUser);
      showFlashMessage(response.status, response.message);
      if (response.status.toString().startsWith('2')) {
        const user = await getUserFromToken();
        setUser(user);
        navigation.navigate('ProfileStackScreen');
      }
    }
    setLoading(false);
  };

  if (!loading) {
    return (
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            nameSurname: user.nameSurname,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
            imageURL: user.imageURL
              ? user.imageURL
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          }}
          onSubmit={values => handleUpdate(values)}
          validationSchema={UpdateProfileSchema}>
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <Pressable
                style={styles.imageBox}
                onPress={() => takeImageFromGallery(setFieldValue)}>
                <Image
                  source={{
                    uri: values.imageURL,
                  }}
                  style={styles.image}
                />
              </Pressable>
              <Input
                label={'Ad Soyad'}
                onChangeText={handleChange('nameSurname')}
                value={values.nameSurname}
                placeholder={user.nameSurname}
                errors={
                  touched.nameSurname &&
                  errors.nameSurname &&
                  errors.nameSurname
                }
              />
              <Input
                label={'E-posta Adresi'}
                onChangeText={handleChange('emailAddress')}
                value={values.emailAddress}
                keyboardType="email-address"
                placeholder={user.emailAddress}
                errors={
                  touched.emailAddress &&
                  errors.emailAddress &&
                  errors.emailAddress
                }
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
                placeholder={user.phoneNumber}
              />
              <Button
                onPress={() => navigation.navigate('ChangePasswordScreen')}
                label="Şifreni Değiştir"
                additionalStyles={styles.profileButtonStyle}
              />
              <Button
                onPress={() =>
                  createAlert(
                    user._id,
                    {
                      ...values,
                      activeStatus: !user.activeStatus,
                    },
                    setUser,
                  )
                }
                label="Hesabı Kapat"
                additionalStyles={styles.profileButtonStyle}
              />
              <Button label="GÜNCELLE" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </ScrollView>
    );
  } else {
    return <Animation animationName={'loading'} />;
  }
};
export default ProfilEdit;
