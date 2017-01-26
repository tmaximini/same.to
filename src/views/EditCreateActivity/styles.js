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
    flex: 3.5,
    justifyContent: 'center',
  },
  checkboxLabel: {
    marginBottom: 10,
    color: COLORS.WHITE,
  },
  button: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
});

