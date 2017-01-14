import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  form: {
    flex: 1,
  },
  checkboxWrapper: {
    padding: 10,
    flex: 1,
  },
  checkboxLabel: {
    marginBottom: 10,
    color: COLORS.WHITE,
  },
  inputWrapper: {
    flex: 7,
    padding: 10,
  }
});

