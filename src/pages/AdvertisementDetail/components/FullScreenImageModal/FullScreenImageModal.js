import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {useTheme} from '../../../../context/ThemeContext';

import {getStyles} from './FullScreenImageModal.style';
import {Button, Input} from '@components';

const FullScreenImageModal = ({isVisible, setVisible}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <Modal
      useNativeDriver={true}
      isVisible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}></Modal>
  );
};

export default FullScreenImageModal;
