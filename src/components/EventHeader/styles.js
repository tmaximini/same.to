import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  bgImage: {
    flex: 5,
    width: null,
    height: null,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.GREY_OPAQ,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 2 * PADDINGS.STANDARD,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 3,
  },
  topRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  participateText: {
    paddingTop: 6,
    color: COLORS.WHITE,
  },
});
