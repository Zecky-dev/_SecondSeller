import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {getStyles} from '../Input/Input.style';
import {getStyles2} from './OptionPicker.style';

import {CONSTANTS} from '@utils';
import THEMECOLORS from '@utils/colors';
import {useTheme} from '@context/ThemeContext';

const OptionPicker = ({label, items, setSelectedItem, errors, value}) => {
  const {theme} = useTheme();
  const COLORS = theme === 'dark' ? THEMECOLORS.DARK : THEMECOLORS.LIGHT;
  const styles = getStyles(theme);
  const styles2 = getStyles2(theme);

  return (
    <View style={{margin: CONSTANTS.margin.L2}}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={value => setSelectedItem(value)}
        value={value}
        items={items}
        placeholder={{key: 4, label: 'Lütfen Seçiniz...', value: 'default'}}
        style={{
          viewContainer: styles2.container,
          inputAndroid: {
            color: COLORS.textColor,
          },
        }}
      />
      {errors && <Text style={styles.errorMessage}>{errors}</Text>}
    </View>
  );
};

export default OptionPicker;
