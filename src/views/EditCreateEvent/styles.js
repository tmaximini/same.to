import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
    justifyContent: 'flex-start',
  },
  form: {
    flexGrow: 1,
    flexShrink: 0,
  },
  inputGroup: {
    flexGrow: 0,
    flexBasis: 1,
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
    flexGrow: 0,
  },
});

