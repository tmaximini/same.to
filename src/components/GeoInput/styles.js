import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
  },
  description: {
    color: COLORS.WHITE,
    fontSize: 12,
    paddingLeft: 5,
  },
  predefinedPlacesDescription: {
    color: COLORS.WHITE,
    fontSize: 10,
  },
  textInputContainer: {
    backgroundColor: COLORS.DARK_GREY,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 5,
  },
  textInput: {
    color: COLORS.WHITE,
    backgroundColor: 'transparent',
    padding: 0,
  },
  listView: {
    zIndex: 99,
    position: 'absolute',
    top: 30,
    backgroundColor: COLORS.DARK_GREY,
  }
});
