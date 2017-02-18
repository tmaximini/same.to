import {
  StyleSheet
} from 'react-native';

import { COLORS, FONT_SIZES, PADDINGS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
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
  },
  bottom: {
    flex: 5,
    backgroundColor: COLORS.BG_GREY,
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.GREY_OPAQ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
    borderColor: COLORS.BG_GREY,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBox: {
    borderRightWidth: 0,
  },
  boxText: {
    color: COLORS.WHITE,
    fontFamily: 'Montserrat',
    paddingBottom: 2,
  },
  info: {
    flex: 1,
  },
  noItems: {
    padding: PADDINGS.STANDARD,
    flex: 1,
  },
  noItemsText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.topInfo(),
    fontFamily: 'Montserrat',
  }
});
