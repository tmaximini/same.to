import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants';

const { width } = Dimensions.get('window');
const itemWidth = (width * (1 / 4)) - 20;

console.log('itemWidth', itemWidth);

export default StyleSheet.create({
  container: {
    width: itemWidth,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  circle: {
    backgroundColor: COLORS.CYAN,
    borderRadius: itemWidth * 0.5,
    height: itemWidth - 10,
    width: itemWidth - 10,
    marginHorizontal: 5,
    marginBottom: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.WHITE,
  },
  itemText: {
    color: COLORS.WHITE,
    fontSize: 10,
    textAlign: 'center'
  }
});
