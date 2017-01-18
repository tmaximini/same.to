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
    flexBasis: 0,
    flexGrow: 1,
  },
  form: {
    flex: 1,
    flexGrow: 1,
  },
  button: {
    flex: 1,
  },
});

