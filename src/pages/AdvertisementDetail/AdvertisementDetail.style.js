import {COLORS, CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  name: {
    color: COLORS.black,
    fontSize: CONSTANTS.fontSize.L5,
    flex: 1,
  },
  price: {
    color: COLORS.green,
    fontSize: CONSTANTS.fontSize.L5,
    fontWeight: '500',
  },

  namePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: CONSTANTS.margin.L3,
  },

  descriptionContainer: {
    marginVertical: CONSTANTS.margin.L1,
  },

  outerContainer: {
    margin: CONSTANTS.margin.L2,
    flex: 1,
  },

  descriptionTitle: {
    fontSize: CONSTANTS.fontSize.L4,
    color: COLORS.black,
    fontWeight: 'bold',
  },

  description: {
    color: COLORS.black,
  },
});
