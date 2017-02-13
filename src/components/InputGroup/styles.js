import { StyleSheet } from 'react-native';
import { PADDINGS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 0,
    flexBasis: 1,
    flexDirection: 'row',
    zIndex: 99,
  },
  spacer: {
    width: PADDINGS.STANDARD,
  },
});
