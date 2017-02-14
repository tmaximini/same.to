import {
  StyleSheet
} from 'react-native';

import { COLORS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  top: {
    flex: 4,
  },
  bottom: {
    flex: 5,
    paddingBottom: 60,
    backgroundColor: COLORS.BG_GREY,
  },
  title: {
    ...MIXINS.title
  },
  titleCaret: {
    color: COLORS.CYAN,
    paddingHorizontal: 5,
    top: -4,
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
  actionButtons: {
    position: 'absolute',
    alignSelf: 'stretch',
    bottom: 0,
    left: 10,
    right: 10,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
