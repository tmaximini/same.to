import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
    paddingTop: PADDINGS.STANDARD,
    paddingHorizontal: PADDINGS.STANDARD,
  },
  wrapper: {
    flex: 1,
  },
  noItems: {
    padding: PADDINGS.STANDARD,
    flex: 1,
  },
  noItemsText: {
    ...MIXINS.topInfo
  }
});
