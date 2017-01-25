import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  inputWrap: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
    height: 40,
    overflow: 'hidden',
    borderRadius: 5,
  },
  select: {
    marginLeft: 5,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: COLORS.CYAN,
    backgroundColor: COLORS.DARK_GREY,
  }
});