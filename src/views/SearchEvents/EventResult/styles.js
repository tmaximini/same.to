import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: PADDINGS.STANDARD,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.DARK_GREY,
  },
  headline: {
    ...MIXINS.title,
  }
});
