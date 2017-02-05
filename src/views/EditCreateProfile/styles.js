import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  wrapper: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'flex-end'
  },
  inputGroup: {
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
});

