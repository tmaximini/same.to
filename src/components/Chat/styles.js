import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  nameWrapper: {
    flex: 0.5,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingBottom: 2,
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 10,
    padding: 5,
    color: COLORS.CYAN
  },
  send: {
    fontSize: 18,
    color: COLORS.CYAN,
    padding: 10,
    fontWeight: 'bold',
  }
});
