import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../../constants';

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
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'column',
    paddingTop: 10,
  },
  middle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    flex: 1,
    paddingLeft: 10,
    color: COLORS.WHITE,
  },
  button: {
    fontSize: 26,
    flex: 2,
    paddingRight: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    zIndex: 10,
    color: COLORS.CYAN,
  },
});

