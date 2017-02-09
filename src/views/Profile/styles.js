import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

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
    marginTop: 15,
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
});