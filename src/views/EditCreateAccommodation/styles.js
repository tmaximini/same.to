import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
  },
  form: {
    flex: 1,
  },
  checkboxWrapper: {
    flex: 2,
    marginBottom: 20,
  },
  checkboxLabel: {
    marginBottom: 10,
    color: COLORS.WHITE,
  },
  inputWrapper: {
    flex: 6,
    justifyContent: 'flex-start',
  },
  button: {
    flex: 2,
  },
  spacer: {
    flex: 4,
  }
});

