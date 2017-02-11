import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
  },
  checkboxLabel: {
    marginBottom: 10,
    color: COLORS.WHITE,
  },
  inputGroup: {
    flexGrow: 0,
    flexBasis: 1,
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
});

