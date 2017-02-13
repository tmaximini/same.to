import {
  StyleSheet
} from 'react-native';

import { COLORS, MIXINS, PADDINGS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    marginBottom: PADDINGS.STANDARD,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bgImage: {
    flex: 1,
    borderRadius: 5,
    width: null,
    height: null,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  touch: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    padding: PADDINGS.STANDARD,
    backgroundColor: COLORS.GREY_OPAQ,
  },
  top: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'flex-start'
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  middle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  titleCaret: {
    color: COLORS.CYAN,
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 3,
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: PADDINGS.STANDARD / 2,
    color: COLORS.WHITE,
    paddingTop: PADDINGS.STANDARD / 2,
  },
  button: {
    fontSize: 26,
    position: 'absolute',
    fontWeight: 'bold',
    textAlign: 'left',
    right: 0,
    color: COLORS.CYAN,
  },
});

