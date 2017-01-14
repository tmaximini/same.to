import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.CYAN,
    borderRadius: 25,
    height: 50,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  trigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: COLORS.WHITE,
    fontSize: 8,
  }
});
