import {COLORS, CONSTANTS} from '@utils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    padding: CONSTANTS.padding.L2,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  appName: {
    fontFamily: 'Galada-Regular',
    fontSize: CONSTANTS.fontSize.L7,
    color: COLORS.black,
    textAlign: 'center',
  },
  title: {
    backgroundColor: COLORS.blackMuted,
    height: 0.5,
    width: '50%',
    alignSelf: 'center',
    marginTop: -CONSTANTS.margin.L4,
    marginBottom: CONSTANTS.margin.L4
  },
});
