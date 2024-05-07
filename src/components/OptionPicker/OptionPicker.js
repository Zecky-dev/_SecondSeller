import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { getStyles } from '../Input/Input.style';
import styles2 from './OptionPicker.style';

import {CONSTANTS} from '@utils';
import { useTheme } from '../../context/ThemeContext';

const OptionPicker = ({label, items, setSelectedItem, errors, value}) => {
  
  const {theme} = useTheme()
  const styles = getStyles(theme)


  return (
    <View style={{margin: CONSTANTS.margin.L2}}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedItem(value)}
        value={value}
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
