import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export default StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.CYAN,
    borderRadius: 5,
    marginRight: 10,
  },
  tagText: {
    color: COLORS.WHITE,
    fontSize: 8,
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    textShadowRadius: 1,
  }
});
