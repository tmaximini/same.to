import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
