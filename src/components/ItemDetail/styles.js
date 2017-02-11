import {
  StyleSheet
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
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
    paddingBottom: 60,
    backgroundColor: COLORS.BG_GREY,
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.GREY_OPAQ,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerWrapper: {
    paddingLeft: 20,
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
    flex: 1.2,
  },
  title: {
    fontSize: 24,
    color: COLORS.WHITE,
  },
  titleCaret: {
    color: COLORS.CYAN,
    padding: 5,
    top: -6,
  },
  details: {
    flex: 1,
  },
  tags: {
    flex: 1,
    paddingTop: 5,
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
  },
  participateText: {
    paddingTop: 8,
    color: COLORS.WHITE,
  },
  actionButtons: {
    position: 'absolute',
    alignSelf: 'stretch',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
