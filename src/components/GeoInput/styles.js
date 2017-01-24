import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    zIndex: 1,
  },
  description: {
    color: COLORS.WHITE,
    fontSize: 12,
    paddingLeft: 5,
    padding: 0,
    zIndex: 1,
  },
  predefinedPlacesDescription: {
    color: COLORS.WHITE,
    fontSize: 10,
    zIndex: 1,
  },
  textInputContainer: {
    backgroundColor: COLORS.DARK_GREY,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 5,
    height: 40,
    zIndex: 1,
  },
  textInput: {
    color: COLORS.WHITE,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 1,
  },
  listView: {
    zIndex: 200,
    position: 'absolute',
    top: 30,
    backgroundColor: COLORS.DARK_GREY,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: COLORS.CYAN,
    zIndex: 99,
    backgroundColor: COLORS.DARK_GREY,
  }
});
