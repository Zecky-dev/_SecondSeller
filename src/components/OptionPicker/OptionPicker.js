import {Text,View} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import styles from '../Input/Input.style'
import {CONSTANTS} from '@utils'


const OptionPicker = ({label,items,setSelectedItem,errors}) => {
  return (
    <View style={{margin: CONSTANTS.margin.L2}}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedItem(value)}
        items={items}
        placeholder={{key: 4, label: "Lütfen Seçiniz...", value: "default"}}
        style={{
          viewContainer: {
            borderColor: 'rgba(0,0,0,0.5)',
            borderWidth: 0.7,
            borderRadius: 4
          },
        }}
      />
      {errors && <Text style={styles.errorMessage}>{errors}</Text>} 
    </View>
    
  )
}

export default OptionPicker