import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  bgImage: {
    flex: 5,
    width: null,
    height: null,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.GREY_OPAQ,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: PADDINGS.DOUBLE,
    paddingVertical: PADDINGS.STANDARD,
  },
  title: {
    ...MIXINS.title,
  },
  topRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  participateText: {
    ...MIXINS.topInfo,
    paddingTop: 6,
  },
  overnight: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  overnightStays: {
    ...MIXINS.topInfo,
    textAlign: 'left',
    paddingTop: 2,
  }
});
