import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center'
  },
  locationIcon: {
    color: COLORS.CYAN,
    fontSize: 16,
    marginRight: 7,
    width: 20,
    paddingLeft: 3,
  },
  locationText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
});
