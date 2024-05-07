import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

import styles from './FilterModal.style';

import {OptionPicker as Dropdown, Button, Input} from '@components';
import CONSTANTS from '@utils/constants';
import {Formik} from 'formik';

// Fiyata göre - artan azalan
// Tarihe göre filtreleme

// Fiyat aralığı
// Kategori

const FilterModal = ({isVisible, setVisible, filter}) => {
  return (
    <View>
      <Modal
        useNativeDriver={true}
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(!isVisible)}
        onBackdropPress={() => setVisible(!isVisible)}>
        <View style={{backgroundColor: 'white', borderRadius: 4}}>
          <Formik
            initialValues={{
              price: 'default',
              date: 'default',
              category: 'default',
              min: null,
              max: null,
            }}
            onSubmit={values => {
              filter(values)
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              resetForm,
              setFieldValue,
            }) => (
              <>
                <Dropdown
                  label={'Fiyata Göre Sırala'}
                  value={values.price}
                  items={CONSTANTS.FILTER_OPTIONS.PRICE}
                  setSelectedItem={selectedPriceOrder => {
                    setFieldValue('price', selectedPriceOrder);
                  }}
                />
                <Dropdown
                  label={'Tarihe Göre Sırala'}
                  value={values.date}
                  items={CONSTANTS.FILTER_OPTIONS.CREATE_DATE}
                  setSelectedItem={selectedDateFilter => {
                    setFieldValue('date', selectedDateFilter);
                  }}
                />
                <Dropdown
                  label={'Kategori'}
                  value={values.category}
                  items={CONSTANTS.FILTER_OPTIONS.CATEGORY}
                  setSelectedItem={selectedCategory => {
                    setFieldValue('category', selectedCategory);
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Input
                    label={'Minimum Fiyat'}
                    keyboardType='number-pad'
                    value={values.min}
                    onChangeText={handleChange("min")}
                    placeholder="0 TL"
                    additionalStyles={{
                      outerContainer: {
                        flex: 1,
                      },
                    }}
                  />
                  <Input
                    label={'Maksimum Fiyat'}
                    keyboardType='number-pad'
                    placeholder="999 TL"
                    value={values.max}
                    onChangeText={handleChange("max")}
                    additionalStyles={{
                      outerContainer: {
                        flex: 1,
                      },
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Button onPress={handleSubmit} label="Filtreleri Uygula" />
                  <Button
                    onPress={resetForm}
                    label="Filtreleri Sıfırla"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
