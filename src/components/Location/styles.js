import { StyleSheet } from 'react-native';
import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
    alignItems: 'center',
    marginBottom: 6,
  },
  locationIcon: {
    color: COLORS.CYAN,
    marginRight: 3,
    paddingLeft: 1.5,
    width: 15,
  },
  locationText: {
    ...MIXINS.topInfo,
  },
});
