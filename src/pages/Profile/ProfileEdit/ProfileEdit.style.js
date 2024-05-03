import { COLORS, CONSTANTS } from '@utils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    alignSelf: 'center',
    marginTop: CONSTANTS.margin.L3,
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: CONSTANTS.padding.L1,
    borderWidth: 5,
    borderColor: COLORS.black,
    borderStyle: 'dashed'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  changePassword: {
    fontSize: CONSTANTS.fontSize.L4,
    fontWeight: 'bold',
    color: COLORS.black,
    marginHorizontal: CONSTANTS.margin.L2,
    marginVertical: CONSTANTS.margin.L1,
    padding: CONSTANTS.padding.L1,
    textDecorationLine: 'underline'
  }
});
