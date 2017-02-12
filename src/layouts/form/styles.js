import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.BG_GREY,
    paddingHorizontal: PADDINGS.STANDARD,
    paddingTop: PADDINGS.STANDARD,
    flexShrink: 0,
  },
});
