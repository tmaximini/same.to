import {
  StyleSheet
} from 'react-native';

import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  inputWrap: {
    flexGrow: 0,
    flexDirection: 'row',
    height: 40,
    marginBottom: PADDINGS.STANDARD,
    backgroundColor: 'transparent',
  },
  input: {
    flexGrow: 1,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: COLORS.DARK_GREY,
    borderRadius: 5,
    color: COLORS.WHITE,
    fontFamily: 'Montserrat',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: COLORS.CYAN,
    backgroundColor: COLORS.DARK_GREY,
  }
});
