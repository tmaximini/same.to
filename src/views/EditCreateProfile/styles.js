import {
  StyleSheet,
  PixelRatio,
} from 'react-native';

import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  wrapper: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'flex-end'
  },
  inputGroup: {
    flexDirection: 'row',
  },
  spacer: {
    width: 10,
  },
  avatarWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
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

