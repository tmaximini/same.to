import { StyleSheet } from 'react-native';
import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.CYAN,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.CYAN,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: PADDINGS.STANDARD,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    paddingBottom: 1,
  },
});
