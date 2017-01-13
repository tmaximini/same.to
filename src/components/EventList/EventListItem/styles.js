import { StyleSheet } from 'react-native';

import { COLORS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    alignItems: 'center',
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
    flexDirection: 'column',
    paddingTop: 10,
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
    fontSize: 32,
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'left',
    color: COLORS.CYAN,
  },
  text: {
    marginLeft: 3,
    fontSize: 12,
    color: COLORS.WHITE,
  },
  location: {
    flex: 1,
    paddingLeft: 12,
    width: 200,
    flexDirection: 'row',
  },
  date: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: 'row',
  },
  icon: {
    color: COLORS.WHITE,
    flex: 1,
    fontSize: 16,
  },
  dateText: {
    flex: 9,
  },
  locationText: {
    flex: 9,
  }

});
