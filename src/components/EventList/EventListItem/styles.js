import { StyleSheet } from 'react-native';

import { COLORS, PADDINGS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    marginBottom: PADDINGS.STANDARD,
    backgroundColor: COLORS.BG_GREY,
    overflow: 'hidden',
    borderRadius: 5,
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
    alignItems: 'center',
    backgroundColor: COLORS.GREY_OPAQ,
    padding: PADDINGS.STANDARD,
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
    fontSize: 20,
    paddingTop: 7,
    textAlign: 'left',
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textShadowColor: COLORS.DARK_GREY,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2,
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
