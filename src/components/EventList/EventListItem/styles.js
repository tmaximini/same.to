import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    marginBottom: 10,
    backgroundColor: COLORS.BG_GREY,
    overflow: 'hidden',
    borderRadius: 5,
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.GREY_OPAQ,
    padding: 10,
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
    flex: 1,
    color: COLORS.WHITE,
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
