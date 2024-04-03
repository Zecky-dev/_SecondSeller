import {StyleSheet} from 'react-native';
import {CONSTANTS,COLORS} from '@utils'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: CONSTANTS.borderWidth.thin,
    borderRadius: CONSTANTS.borderRadius.L1,
    paddingHorizontal: CONSTANTS.padding.L1,
    borderColor: COLORS.black,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1
  }
});
