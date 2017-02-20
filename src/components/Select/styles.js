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
    marginLeft: 15,
    justifyContent: 'center',
    borderWidth: 0,
    top: -44,
    paddingVertical: 2,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: COLORS.CYAN,
    backgroundColor: COLORS.DARK_GREY,
  },
  selected: {
    padding: 12,
    color: COLORS.WHITE,
    fontSize: 14,
    flex: 1,
  }
});
