import { StyleSheet } from 'react-native';
import { COLORS, MIXINS, FONT_SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center',
  },
  dateIcon: {
    color: COLORS.CYAN,
    marginRight: 3,
    width: 15,
  },
  dateText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.topInfo(),
    paddingTop: 1,
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
});
