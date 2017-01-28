import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BG_GREY,
  },
  buttons: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'stretch',
    bottom: 55,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  newButton: {
    backgroundColor: 'black',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

