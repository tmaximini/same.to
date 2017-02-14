import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center',
  },
  dateIcon: {
    color: COLORS.CYAN,
    marginRight: 3,
    width: 15,
  },
  dateText: {
    ...MIXINS.topInfo,
    paddingBottom: 2,
  },
});
