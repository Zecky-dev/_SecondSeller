import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Slider, Input} from '@components';

import Dropdown from '../../components/OptionPicker/OptionPicker';
import {CONSTANTS} from '@utils';

import {Formik} from 'formik';
import {CreateAdvertisementSchema} from '@utils/validationSchemas';

import styles from './CreateAdvertisement.style';

import {showMessage} from 'react-native-flash-message';
import {getUserFromToken,getCurrentLocation} from '@utils/functions';

// Galeriden resim seçilir, slider'a set edilir.
const takeImageFromGallery = async (setImageURIS, setFieldValue) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    cameraType: 'back',
    quality: 1,
    selectionLimit: 3,
  });
  const imageURIS = [];
  for (let asset of result.assets) {
    imageURIS.push(asset.uri);
  }
  setImageURIS(imageURIS);
  setFieldValue('advertisementImageURIS', imageURIS);
};



const CreateAdvertisement = () => {
  // Galeriden seçilen resimlerin dizisini tutan state
  const [imageURIS, setImageURIS] = useState([]);
  const [loading, setLoading] = useState(false);

  // Konum, kullanıcı ve ilan bilgilerini konsola yazdıran fonksiyon
  const createAdvertisement = async values => {
    let location, user, advertisementData;
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (!granted) {
      const permissionRequestResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permissionRequestResult === 'granted') {
        // Konum bilgisini al
        setLoading(true);
        location = await getCurrentLocation();
        if (location !== null && location !== undefined) {
          user = await getUserFromToken();
          advertisementData = { ...values, location, owner: user._id  }
          console.log(advertisementData);
          setLoading(false);
          setImageURIS([])
        }
      } else {
        showMessage({
          message:
            'Konum iznini vermeden ilan paylaşımı yapamazsınız, uygulama ayarlarından konum iznini veriniz.',
          type: 'warning',
        });
      }
    } else {
      // Konum bilgisini al
      setLoading(true);
      location = await getCurrentLocation();
      if (location !== null && location !== undefined) {
        user = await getUserFromToken();
        advertisementData = { ...values, location, owner: user._id  }
        console.log(advertisementData);
        setLoading(false);
        setImageURIS([])
      }
    }
  };

  if (loading) {
    return (
      <View style="flex: 1; justify-content: center; align-items: center">
        <Text>Loading!</Text>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            advertisementName: '',
            advertisementDescription: '',
            advertisementPrice: 0,
            advertisementCategory: 'default',
            advertisementImageURIS: [],
          }}
          validationSchema={CreateAdvertisementSchema}
          onSubmit={values => createAdvertisement(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              {/* Resim Seçme */}
              <Slider
                images={imageURIS}
                errors={
                  errors.advertisementImageURIS &&
                  touched.advertisementImageURIS &&
                  errors.advertisementImageURIS
                }
              />
              <Button
                onPress={() =>
                  takeImageFromGallery(setImageURIS, setFieldValue)
                }
                label={
                  imageURIS.length !== 0
                    ? 'Fotoğrafları Değiştir'
                    : 'Fotoğraf Seç'
                }
              />

              <Input
                label={'İlan İsmi'}
                onChangeText={handleChange('advertisementName')}
                value={values.advertisementName}
                errors={
                  errors.advertisementName &&
                  touched.advertisementName &&
                  errors.advertisementName
                }
              />

              <Input
                label={'İlan Açıklaması'}
                value={values.advertisementDescription}
                onChangeText={handleChange('advertisementDescription')}
                errors={
                  errors.advertisementDescription &&
                  touched.advertisementDescription &&
                  errors.advertisementDescription
                }
                multiline
              />

              <Input
                keyboardType="number-pad"
                label={'İlan Fiyatı'}
                value={values.advertisementPrice}
                onChangeText={val => {
                  const value = Number(val);
                  setFieldValue('advertisementPrice', value);
                }}
                errors={
                  errors.advertisementPrice &&
                  touched.advertisementPrice &&
                  errors.advertisementPrice
                }
              />

              <Dropdown
                label={'İlan Kategorisi'}
                items={CONSTANTS.ADVERTISEMENT_CATEGORIES}
                setSelectedItem={selectedCategory => {
                  setFieldValue('advertisementCategory', selectedCategory);
                }}
                errors={
                  errors.advertisementCategory &&
                  touched.advertisementCategory &&
                  errors.advertisementCategory
                }
              />

              <Button onPress={handleSubmit} label="İlan Oluştur" />
            </>
          )}
        </Formik>
      </ScrollView>
    );
  }
};

export default CreateAdvertisement;
