import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: COLORS.BG_GREY,
    overflow: 'hidden',
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.GREY_OPAQ,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
  },
  headline: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  top: {
    flex: 2,
    flexDirection: 'row',
  },
  bottom: {
    flex: 2,
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  middle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    flex: 24,
    paddingLeft: 10,
    color: COLORS.WHITE,
  },
  button: {
    fontSize: 25,
    flex: 2,
    textAlign: 'left',
    color: COLORS.CYAN,
  },
  text: {
    marginLeft: 12,
    fontSize: 12,
    color: COLORS.WHITE,
  },
  location: {
    flex: 1,
  },
  date: {
    flex: 1,
  },

});
