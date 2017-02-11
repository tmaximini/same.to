import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, MIXINS } from '../../../constants';

const { width } = Dimensions.get('window');
const itemWidth = (width * (1 / 4)) - 20;

export default StyleSheet.create({
  container: {
    width: itemWidth,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  circle: {
    borderRadius: itemWidth * 0.5,
    height: itemWidth - 10,
    width: itemWidth - 10,
    marginHorizontal: 5,
    marginBottom: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    ...MIXINS.image,
    borderRadius: (itemWidth - 10) * 0.5
  },
  checked: {
    borderRadius: (itemWidth - 10) * 0.5,
    backgroundColor: COLORS.CYAN_OPAQ,
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.WHITE,
    backgroundColor: 'transparent',
  },
  itemText: {
    color: COLORS.WHITE,
    fontSize: 10,
    textAlign: 'center'
  }
});
