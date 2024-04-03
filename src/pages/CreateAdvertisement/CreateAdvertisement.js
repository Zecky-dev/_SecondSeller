import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Slider, Input} from '@components';

import Dropdown from '../../components/OptionPicker/OptionPicker';
import {CONSTANTS} from '@utils';

import {Formik} from 'formik';
import {CreateAdvertisementSchema} from '@utils/validationSchemas';

import styles from './CreateAdvertisement.style'


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

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          advertisementName: '',
          advertisementDescription: '',
          advertisementPrice: 0,
          advertisementCategory: 'default',
          advertisementImageURIS: [],
        }}
        validationSchema={CreateAdvertisementSchema}
        onSubmit={values => console.log(values)}>
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
              onPress={() => takeImageFromGallery(setImageURIS, setFieldValue)}
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
};

export default CreateAdvertisement;
