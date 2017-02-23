import { StyleSheet } from 'react-native';

import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  interests: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexGrow: 0,
    flexShrink: 0,
    flexWrap: 'wrap',
    marginTop: 15,
    paddingHorizontal: 12,

  },
  textBox: {
    marginTop: 15,
  },
  interestBox: {
    backgroundColor: COLORS.CYAN,
    margin: 2.5,
    padding: 5,
  },
  interestText: {
    color: COLORS.WHITE,
    fontSize: 13,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 13,
  },
  actions: {
    marginTop: PADDINGS.STANDARD,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  icon: {
    color: COLORS.CYAN
  }
});
