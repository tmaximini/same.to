import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { COLORS, MIXINS, PADDINGS } from '../../../constants';

const { width } = Dimensions.get('window');
const itemWidth = (width * (1 / 4)) - (2 * PADDINGS.STANDARD);

export default StyleSheet.create({
  container: {
    width: itemWidth,
    marginRight: 15,
    marginTop: 5,
    marginBottom: PADDINGS.STANDARD,
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
  inactive: {
    borderRadius: (itemWidth - 10) * 0.5,
    borderColor: COLORS.CYAN,
    flexGrow: 1,
    borderWidth: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 8,
    textAlign: 'center'
  }
});
