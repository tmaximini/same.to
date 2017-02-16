import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: PADDINGS.STANDARD,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.DARK_GREY,
    height: 70,
  },
  headline: {
    ...MIXINS.title,
    backgroundColor: 'transparent',
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 5,
    alignSelf: 'stretch',
    overflow: 'hidden',

  },
  wrapper: {
    flexGrow: 1,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.GREY_OPAQ,
    padding: PADDINGS.STANDARD,
  },
});
