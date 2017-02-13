import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

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
    fontSize: 14,
    paddingTop: 1,
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
});
