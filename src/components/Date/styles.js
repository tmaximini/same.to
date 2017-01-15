import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center'
  },
  dateIcon: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginRight: 7,
  },
  dateText: {
    color: COLORS.WHITE,
  },
});
