import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  inputWrap: {
    flexGrow: 1,
    flexDirection: 'row',
    height: 40,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 14,
    backgroundColor: COLORS.DARK_GREY,
    borderRadius: 5,
    color: COLORS.WHITE,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: COLORS.CYAN,
    backgroundColor: COLORS.DARK_GREY,
  }
});
