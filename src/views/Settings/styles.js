import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, PADDINGS } from '../../constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: PADDINGS.STANDARD,
  },
  settings: {
    flex: 1,
    alignSelf: 'stretch',
  },
  setting: {
    paddingVertical: PADDINGS.STANDARD,
    borderBottomWidth: 1,
    borderColor: COLORS.DARK_GREY,
  },
  settingText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoWrapper: {
    flex: 1,
    width: width - (2 * PADDINGS.STANDARD),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logo: {
    width: width / 2,
  }
});
