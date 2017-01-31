import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.CYAN,
    padding: 10,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.CYAN,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
});
