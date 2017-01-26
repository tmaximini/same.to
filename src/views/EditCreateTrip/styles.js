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
  form: {
    flexGrow: 1,
  },
  checkboxWrapper: {
    flex: 2.5,
    marginBottom: 20,
  },
  checkboxLabel: {
    marginBottom: 10,
    color: COLORS.WHITE,
  },
  button: {
    justifyContent: 'flex-end',
  },
});

