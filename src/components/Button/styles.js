import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.CYAN,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.CYAN,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
