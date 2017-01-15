import {
  StyleSheet
} from 'react-native';

import { COLORS, MIXINS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 10,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bgImage: {
    flex: 1,
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
    backgroundColor: COLORS.GREY_OPAQ,
  },
  top: {
    flex: 1,
    ...MIXINS.floatLeft,
  },
  bottom: {
    flex: 1,
    ...MIXINS.floatLeft,
    paddingTop: 10,
  },
  middle: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 10,
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
    paddingLeft: 10,
    color: COLORS.WHITE,
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 10,
    color: COLORS.WHITE,
    paddingTop: 7,
  },
  button: {
    fontSize: 26,
    flex: 2,
    position: 'absolute',
    paddingRight: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    right: 0,
    zIndex: 10,
    color: COLORS.CYAN,
  },
});

