import Modal from 'react-native-modal';
import {useTheme} from '@context/ThemeContext';

import {Slider} from '@components';
import {getStyles} from './FullScreenImageModal.style';

const FullScreenImageModal = ({isVisible, setVisible, images}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <Modal
      style={styles.container}
      useNativeDriver={true}
      isVisible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}>
      <Slider images={images} type="full" onPress={() => setVisible(false)} />
    </Modal>
  );
};

export default FullScreenImageModal;
