import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.BG_GREY,
    paddingHorizontal: PADDINGS.STANDARD,
    paddingTop: PADDINGS.STANDARD,
    flexShrink: 0,
    flex: 1,
  },
  extraText: {
    ...MIXINS.topInfo,
    paddingBottom: PADDINGS.STANDARD,
    paddingTop: 6,
    fontWeight: '200',
  }
});
