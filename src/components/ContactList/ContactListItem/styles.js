import { StyleSheet } from 'react-native';

import { COLORS, MIXINS } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    marginBottom: 10,
    backgroundColor: COLORS.DARK_GREY,
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.CYAN,
  },
  top: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 10,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  image: {
    ...MIXINS.image,
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
  },
  locationText: {
    color: COLORS.WHITE,
    fontSize: 10,
    paddingTop: 2,
  },
  workText: {
    color: COLORS.WHITE,
    fontSize: 8,
  },
  interests: {
    color: COLORS.WHITE,
    fontSize: 8,
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
