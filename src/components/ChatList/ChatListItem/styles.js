import { StyleSheet } from 'react-native';

import { COLORS, MIXINS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    marginBottom: 10,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: COLORS.DARK_GREY,
  },
  touchable: {
    flex: 1,
    backgroundColor: 'red',
  },
  wrapper: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 5,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  left: {
    flex: 3,
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    ...MIXINS.image,
  },
  nameText: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingRight: 15,
    fontFamily: 'Montserrat',
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 6,
  },
  dateTime: {
    color: COLORS.WHITE,
    fontSize: 10,
  },
  lastMessage: {
    paddingRight: 15,
  },
  lastUserText: {
    paddingTop: 6,
    paddingRight: 15,
    paddingBottom: 3,
    color: COLORS.WHITE,
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  conversation: {
    color: COLORS.WHITE,
    fontSize: 9,
  }
});
