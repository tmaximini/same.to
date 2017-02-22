import { StyleSheet } from 'react-native';

import { COLORS, PADDINGS, MIXINS, FONT_SIZES } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    paddingHorizontal: PADDINGS.STANDARD,
    paddingBottom: PADDINGS.STANDARD,
    backgroundColor: COLORS.BG_GREY,
  },
  imgWrap: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch',
  },
  wrapper: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: COLORS.GREY_OPAQ,
    padding: PADDINGS.STANDARD,
    borderRadius: 5,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
  },
  headline: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleCaret: {
    color: COLORS.CYAN,
    position: 'absolute',
    right: 0,
    top: 3,
  },
  middle: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    ...MIXINS.title,
    fontSize: FONT_SIZES.subTitle(),
    paddingTop: 7,
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    right: 0,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    color: COLORS.CYAN,
  },
  text: {
    marginLeft: 3,
    fontSize: 12,
    color: COLORS.WHITE,
  },
});
