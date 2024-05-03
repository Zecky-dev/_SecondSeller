import Modal from 'react-native-modal';

const FilterModal = ({isVisible, setVisible}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(!isVisible)}
        onBackdropPress={() => setVisible(!isVisible)}>
        <View style={{flex: 1}}>
          <Text>I am the modal content</Text>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
