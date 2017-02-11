import {
  StyleSheet,
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
    padding: 10,
    justifyContent: 'flex-start'
  },
  wrapper: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  inputGroup: {
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
    flexGrow: 0,
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

