import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center'
  },
  locationIcon: {
    color: COLORS.CYAN,
    marginRight: 3,
    paddingLeft: 3,
    width: 15,
  },
  locationText: {
    color: COLORS.WHITE,
    fontSize: 14,
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
});
