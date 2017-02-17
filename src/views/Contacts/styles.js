import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  noItems: {
    padding: PADDINGS.STANDARD,
    flex: 1,
  },
  noItemsText: {
    ...MIXINS.topInfo
  }
});
