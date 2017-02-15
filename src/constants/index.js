import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

console.log('width', width);


export const COLORS = {
  BG_GREY: '#272C34',
  DARK_GREY: '#232529',
  CYAN: 'rgba(68,203,198,1)',
  WHITE: '#FFFFFF',
  GREY_OPAQ: 'rgba(39,42,49,0.7)',
  CYAN_OPAQ: 'rgba(27,203,199,0.7)',
};

export const FONT_SIZES = {
  title: () => (width > 320 ? 24 : 20),
  subTitle: () => (width > 320 ? 20 : 18),
  topInfo: () => (width > 320 ? 12 : 10),
};

export const PADDINGS = {
  STANDARD: 12,
  DOUBLE: 24,
};

export const MIXINS = {
  container: {
    flex: 1,
    padding: PADDINGS.STANDARD,
    backgroundColor: COLORS.BG_GREY,
  },
  floatLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch',
  },
  title: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.title(),
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 3,
  },
  topInfo: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.topInfo(),
    fontFamily: 'Montserrat',
  },
  lightText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: '100',
  }
};
