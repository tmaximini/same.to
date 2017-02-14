import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 0,
    backgroundColor: 'transparent'
  },
  label: {
    padding: 5,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.topInfo(),
  }

});
