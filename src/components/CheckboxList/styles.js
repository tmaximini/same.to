import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  checkboxLabel: {
    marginBottom: PADDINGS.STANDARD,
    color: COLORS.WHITE,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexGrow: 0,
    flexShrink: 0,
    flexWrap: 'wrap',
    marginBottom: PADDINGS.STANDARD,
  },
});
