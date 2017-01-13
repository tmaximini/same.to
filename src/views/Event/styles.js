import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 3,
  },
  bgImage: {
    flex: 4,
    width: null,
    height: null,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  bottom: {
    flex: 5,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.GREY_OPAQ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  details: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
    borderColor: COLORS.WHITE,
    borderRightWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: COLORS.WHITE,
  },
  info: {
    flex: 1,
  }
});
