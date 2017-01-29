
export const COLORS = {
  BG_GREY: '#272C34',
  DARK_GREY: '#232529',
  CYAN: 'rgba(68,203,198,1)',
  WHITE: '#FFFFFF',
  GREY_OPAQ: 'rgba(39,42,49,0.7)',
  CYAN_OPAQ: 'rgba(27,203,199,0.7)',
};

export const FONT_SIZES = {
  BIG: 24,
  TITLE: 32,
  BUTTON: 16,
};

export const MIXINS = {
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
  }
};
