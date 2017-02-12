import {
  StyleSheet,
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    backgroundColor: COLORS.CYAN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120
  },
  avatarText: {
    color: COLORS.WHITE,
  }
});

