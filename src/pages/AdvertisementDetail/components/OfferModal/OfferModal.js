import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from '@context/ThemeContext';

import {getStyles} from './OfferModal.style';
import {Button, Input} from '@components';

const OfferModal = ({isVisible, setVisible, price, sendOffer}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const [offerPrice, setOfferPrice] = useState('');

  return (
    <Modal
      style={styles.container}
      useNativeDriver={true}
      isVisible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.offerContainer}>
        <Text
          style={styles.offer}
          onPress={() => sendOffer(parseInt(price * 0.9))}>
          {parseInt(price * 0.9)}
        </Text>
        <Text
          style={styles.offer}
          onPress={() => sendOffer(parseInt(price * 0.8))}>
          {parseInt(price * 0.8)}
        </Text>
      </View>
      <Input
        keyboardType="number-pad"
        value={offerPrice}
        onChangeText={setOfferPrice}
      />
      <Button
        label="Teklif Ver"
        onPress={() => {
          if (offerPrice !== '') sendOffer(offerPrice);
        }}
      />
    </Modal>
  );
};

export default OfferModal;
