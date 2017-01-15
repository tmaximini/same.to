import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center'
  },
  locationIcon: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginRight: 7,
  },
  locationText: {
    color: COLORS.WHITE,
  },
});
