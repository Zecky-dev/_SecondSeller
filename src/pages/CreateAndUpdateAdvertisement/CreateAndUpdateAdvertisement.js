import React, {useState} from 'react';

// Components
import {ScrollView} from 'react-native';

import {Button, Slider, Input, Animation} from '@components';
import Dropdown from '../../components/OptionPicker/OptionPicker';

// Constants
import {CONSTANTS} from '@utils';

// Formik & Form Validation
import {Formik} from 'formik';
import {CreateAdvertisementSchema} from '@utils/validationSchemas';

// Styles
import {getStyles} from './CreateAndUpdateAdvertisement.style';

// Utility functions
import {launchImageLibrary} from 'react-native-image-picker';
import {
  getUserFromToken,
  resizeImage,
  locationPermissionGranted,
  getCurrentLocation,
  showFlashMessage,
} from '@utils/functions';
import {showMessage} from 'react-native-flash-message';

// Service functions
import {
  createAdvertisementAPI,
  updateAdvertisementAPI,
} from '../../services/advertisementServices';
import {uploadImagesAndGetURLs} from '../../services/otherServices';

// useUser hook
import {useUser} from '../../context/UserProvider';
import {useTheme} from '../../context/ThemeContext';

// Galeriden resim seçilir, boyutu küçültülür ve slider'a set edilir.
const takeImageFromGallery = async (setImages, setFieldValue) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    cameraType: 'back',
    quality: 1,
    selectionLimit: 3,
  });
  const images = [];
  if (!result.didCancel) {
    for (let asset of result.assets) {
      try {
        const resizedImage = await resizeImage(asset, 1280, 720);
        if (resizeImage !== null) {
          images.push(resizedImage.uri);
        }
      } catch (err) {
        showMessage({
          message: 'Resim seçilirken hata meydana geldi, tekrar deneyiniz!',
          type: 'danger',
        });
        return;
      }
    }
  }
  setImages(images);
  setFieldValue('images', images);
};

const CreateAndUpdateAdvertisement = ({navigation, route}) => {
  const {advertisement, isOwnStack} = route.params;
  const {theme} = useTheme();
  const styles = getStyles(theme);

  // Galeriden seçilen resimlerin dizisini tutan state
  const [images, setImages] = useState(
    advertisement ? advertisement.images : [],
  );
  const [loading, setLoading] = useState(false);
  const {user: User} = useUser();

  // Konum, kullanıcı ve ilan bilgilerini konsola yazdıran fonksiyon
  const createAdvertisement = async values => {
    let location, user, advertisementData, imageURLs;
    const locationPermission = await locationPermissionGranted();
    if (locationPermission) {
      setLoading(true);
      user = await getUserFromToken();
      imageURLs = await uploadImagesAndGetURLs(images);
      location = await getCurrentLocation();
      advertisementData = {
        ...values,
        location,
        owner: user._id,
        images: imageURLs,
      };
      const response = await createAdvertisementAPI(
        advertisementData,
        User.token,
      );
      const {status, message} = response.data;
      if (status !== 'success') {
        showMessage({
          message,
          type: 'danger',
        });
        return;
      }
      navigation.navigate('HomeScreen');
      setLoading(false);
      setImages([]);
    } else {
      showMessage({
        message:
          'Konum iznini vermeden ilan paylaşımı yapamazsınız, uygulama ayarlarından konum iznini veriniz.',
        type: 'warning',
      });
    }
  };

  const updateAdvertisement = async values => {
    setLoading(true);

    if (advertisement.images !== values.images)
      values.images = await uploadImagesAndGetURLs(values.images);

    values.owner = advertisement.owner;
    values.location = advertisement.location;
    values.soldStatus = advertisement.soldStatus;

    const response = await updateAdvertisementAPI(
      advertisement._id,
      values,
      User.token,
    );
    showFlashMessage(response.status, response.data.message);
    navigation.goBack();
    setLoading(false);
  };

  if (loading) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            title: advertisement ? advertisement.title : '',
            description: advertisement ? advertisement.description : '',
            price: advertisement ? String(advertisement.price) : '',
            category: advertisement ? advertisement.category : 'default',
            images,
          }}
          validationSchema={CreateAdvertisementSchema}
          onSubmit={values => {
            advertisement
              ? updateAdvertisement(values)
              : createAdvertisement(values);
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              {/* Resim Seçme */}
              <Slider
                images={images}
                errors={errors.images && touched.images && errors.images}
              />

              <Button
                onPress={() => takeImageFromGallery(setImages, setFieldValue)}
                label={
                  images.length !== 0 ? 'Fotoğrafları Değiştir' : 'Fotoğraf Seç'
                }
              />

              <Input
                label={'İlan İsmi'}
                onChangeText={handleChange('title')}
                value={values.title}
                errors={errors.title && touched.title && errors.title}
              />

              <Input
                label={'İlan Açıklaması'}
                value={values.description}
                onChangeText={handleChange('description')}
                errors={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                multiline
              />

              <Input
                keyboardType="number-pad"
                label={'İlan Fiyatı'}
                value={values.price}
                onChangeText={val => setFieldValue('price', val)}
                errors={errors.price && touched.price && errors.price}
              />

              <Dropdown
                value={values.category}
                label={'İlan Kategorisi'}
                items={CONSTANTS.ADVERTISEMENT_CATEGORIES}
                setSelectedItem={selectedCategory => {
                  setFieldValue('category', selectedCategory.toLowerCase());
                }}
                errors={errors.category && touched.category && errors.category}
              />

              <Button
                onPress={handleSubmit}
                label={advertisement ? 'İlan Güncelle' : 'İlan Oluştur'}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    );
  }
};

export default CreateAndUpdateAdvertisement;
