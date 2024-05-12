import {StyleSheet} from 'react-native';

import { COLORS, CONSTANTS } from '@utils'
import THEMECOLORS from '@utils/colors'

const bubble = {
  width: '75%',
  margin: CONSTANTS.margin.L1,
  padding: CONSTANTS.padding.L2,
  borderWidth: CONSTANTS.borderWidth.thin,
  borderTopLeftRadius: CONSTANTS.borderRadius.L2,
  borderTopRightRadius: CONSTANTS.borderRadius.L2,
}

export const getStyles = theme => {
  const COLORS = theme === "dark" ? THEMECOLORS.DARK : THEMECOLORS.LIGHT
  return StyleSheet.create({
  
    bubbleContainer_left: {
      alignItems: 'flex-start',
    },
    
    bubbleContainer_right: {
      alignItems: 'flex-end'
    },
  
    bubble_left: {
      ...bubble,
      backgroundColor: COLORS.cardBackground,
      borderColor: COLORS.borderColor,
      borderBottomRightRadius: CONSTANTS.borderRadius.L2,
  },
  
    bubble_right: {
      ...bubble,
      backgroundColor: COLORS.cardBackground,
      borderColor: COLORS.borderColor,
      borderBottomLeftRadius: CONSTANTS.borderRadius.L2,
    },
  
    messageOwner: {
      color: COLORS.cardTitle,
      fontSize: CONSTANTS.fontSize.L4,
      fontWeight: 'bold',
      marginLeft: CONSTANTS.margin.L2
    },
    message: {
      fontSize: CONSTANTS.fontSize.L3,
      color: COLORS.cardTitle,
    },
    messageDate: {
      alignSelf: 'flex-end',
      color: COLORS.cardDescription,
    },
  });
   
}