import {CONSTANTS} from '@utils';
import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  emptySlider: {
    width: '100%',
    height: 150,
  },
  container: {
    width: Dimensions.get('window').width - 2 * CONSTANTS.margin.L2,
    height: 200,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: CONSTANTS.borderRadius.L1,
  },
});
