import {StyleSheet} from 'react-native';

import CONSTANTS from '../../utils/constants';
import COLORS from '../../utils/colors';

const bubble = {
    width: '75%',
    margin: CONSTANTS.margin.L1,
    padding: CONSTANTS.padding.L2,
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: CONSTANTS.borderRadius.L2,
    borderTopRightRadius: CONSTANTS.borderRadius.L2,
}

export default StyleSheet.create({
  
  bubbleContainer_left: {
    alignItems: 'flex-start',
  },
  
  bubbleContainer_right: {
    alignItems: 'flex-end'
  },

  bubble_left: {
    ...bubble,
    borderBottomRightRadius: CONSTANTS.borderRadius.L2,
},

  bubble_right: {
    ...bubble,
    borderBottomLeftRadius: CONSTANTS.borderRadius.L2,
  },

  
  


  messageOwner: {
    color: COLORS.black,
    fontSize: CONSTANTS.fontSize.L4,
    fontWeight: 'bold',
  },
  message: {
    fontSize: CONSTANTS.fontSize.L3,
    color: COLORS.black,
  },
  messageDate: {
    alignSelf: 'flex-end',
    color: COLORS.black,
  },
});
