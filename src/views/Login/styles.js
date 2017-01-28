import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  background: {
    width: null,
    height: null,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  or: {
    textAlign: 'center',
    color: COLORS.WHITE
  },
  error: {
    textAlign: 'center',
    color: 'red'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

