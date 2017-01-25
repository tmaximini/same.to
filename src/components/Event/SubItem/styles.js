import {
  StyleSheet
} from 'react-native';

import { COLORS, MIXINS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
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
    padding: 10,
    backgroundColor: COLORS.GREY_OPAQ,
  },
  top: {
    flex: 1,
    ...MIXINS.floatLeft,
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  middle: {
    flex: 2,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
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
    position: 'absolute',
    fontWeight: 'bold',
    textAlign: 'left',
    right: 0,
    color: COLORS.CYAN,
  },
});

