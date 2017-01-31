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
    fontSize: 16,
    marginRight: 7,
    width: 20,
  },
  dateText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
});
