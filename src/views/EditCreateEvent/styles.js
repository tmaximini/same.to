import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
    justifyContent: 'flex-start',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});

