import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import styles from '../Input/Input.style';
import styles2 from './OptionPicker.style';

import {CONSTANTS} from '@utils';

const OptionPicker = ({label, items, setSelectedItem, errors, value}) => {
  return (
    <View style={{margin: CONSTANTS.margin.L2}}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        value={value}
        onValueChange={value => setSelectedItem(value)}
        items={items}
        placeholder={{key: 4, label: 'Lütfen Seçiniz...', value: 'default'}}
        style={{
          viewContainer: styles2.container,
        }}
      />
      {errors && <Text style={styles.errorMessage}>{errors}</Text>}
    </View>
  );
};

export default OptionPicker;
