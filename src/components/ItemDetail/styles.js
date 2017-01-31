import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 3,
  },
  bgImage: {
    flex: 5,
    width: null,
    height: null,
    alignSelf: 'stretch',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bottom: {
    flex: 5,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.GREY_OPAQ,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerWrapper: {
    paddingLeft: 30,
    maxHeight: 100,
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'space-between',
  },
  date: {
    height: 10,
    flex: 1,
    paddingTop: 8,
  },
  topRight: {
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  titleWrap: {
    flex: 2,
  },
  title: {
    fontSize: 26,
    color: COLORS.WHITE,
  },
  details: {
    flex: 1,
  },
  tags: {
    flex: 1,
    paddingTop: 8,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
    borderColor: COLORS.WHITE,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBox: {
    borderRightWidth: 0,
  },
  boxText: {
    color: COLORS.WHITE,
  },
  info: {
    flex: 1,
  },
  noItems: {
    padding: 10,
    flex: 1,
  },
  noItemsText: {
    color: COLORS.WHITE,
  }
});
