import { StyleSheet } from 'react-native';

import { COLORS, MIXINS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 80,
    marginBottom: 10,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: COLORS.DARK_GREY,
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
    flexGrow: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderColor: COLORS.CYAN,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: COLORS.CYAN_OPAQ,
    position: 'absolute',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  imageWrapper: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderColor: COLORS.CYAN,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personDetails: {
    flex: 1,
    marginLeft: 8,
    paddingTop: 2,
    alignItems: 'flex-start',
  },

  nameText: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  locationText: {
    color: COLORS.WHITE,
    fontSize: 10,
    paddingVertical: 2,
    fontFamily: 'Montserrat',
  },
  workText: {
    color: COLORS.WHITE,
    fontSize: 8,
    fontFamily: 'Montserrat',
    marginBottom: 2,
  },
  interests: {
    color: COLORS.WHITE,
    fontSize: 8,
    fontFamily: 'Montserrat',
  },
  actions: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  icon: {
    color: COLORS.CYAN
  }
});
