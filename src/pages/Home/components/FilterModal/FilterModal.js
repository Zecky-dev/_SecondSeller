import { View , Text } from 'react-native'
import Modal from 'react-native-modal';

import styles from './FilterModal.style'

const FilterModal = ({isVisible, setVisible}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(!isVisible)}
        onBackdropPress={() => setVisible(!isVisible)}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text>I am the modal content</Text>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
