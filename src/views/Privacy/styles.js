import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDINGS.STANDARD,
    backgroundColor: COLORS.BG_GREY,
  },
  impressumText: {
    ...MIXINS.topInfo,
    marginBottom: 20,
  }
});
