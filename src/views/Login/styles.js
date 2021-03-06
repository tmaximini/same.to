import {
  StyleSheet,
} from 'react-native';
import { COLORS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    width: null,
    height: null,
  },
  or: {
    textAlign: 'center',
    color: COLORS.WHITE,
    marginBottom: PADDINGS.STANDARD,
  },
  error: {
    textAlign: 'center',
    color: 'red'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

