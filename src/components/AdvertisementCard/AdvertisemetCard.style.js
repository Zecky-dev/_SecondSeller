import {Dimensions, StyleSheet} from 'react-native';

import {COLORS, CONSTANTS} from '@utils';

const littleCardStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: CONSTANTS.margin.L1,
    alignItems: 'center',
    borderColor: COLORS.black,
    padding: CONSTANTS.padding.L1,
    borderWidth: CONSTANTS.borderWidth.thin,
    alignSelf: 'flex-start',
    borderRadius: CONSTANTS.borderRadius.L1,
  },
  imageContainer: {},
  image: {
    width: Dimensions.get('window').width / 2 - 4 * CONSTANTS.margin.L2,
    height: 180,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: CONSTANTS.margin.L2,
  },
  price: {
    fontSize: CONSTANTS.fontSize.L3,
    color: COLORS.blackMuted,
  },
  name: {
    color: COLORS.black,
    fontSize: CONSTANTS.fontSize.L4,
    fontWeight: 'bold',
    marginTop: CONSTANTS.margin.L2,
  },
  addFavoriteButton: {
    position: 'absolute',
    right: CONSTANTS.margin.L3,
    top: CONSTANTS.margin.L3,
    backgroundColor: COLORS.white,
    borderRadius: CONSTANTS.borderRadius.L4,
    padding: CONSTANTS.padding.L1,
  },
});

const bigCardStyles = StyleSheet.create({
  cardContainer: {
    margin: CONSTANTS.margin.L2,
    borderWidth: 0.5,
    padding: CONSTANTS.padding.L3,
    borderRadius: CONSTANTS.borderRadius.L3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  name: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: CONSTANTS.fontSize.L5,
    marginVertical: CONSTANTS.margin.L2,
    fontWeight: 'bold',
  },
  description: {
    fontSize: CONSTANTS.fontSize.L3,
    color: COLORS.black,
  },
  price: {
    color: COLORS.green,
    fontSize: CONSTANTS.fontSize.L4,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  likeButton: {
    position: 'absolute',
    right: CONSTANTS.margin.L2,
    top: CONSTANTS.margin.L2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: CONSTANTS.margin.L2,
  },
});

export {littleCardStyles, bigCardStyles};
