import {
  StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS } from '../../constants';

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
    padding: 10,
  },
  settings: {
    flex: 1,
    alignSelf: 'stretch',
  },
  setting: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.DARK_GREY,
  },
  settingText: {
    color: COLORS.WHITE
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width - 20,
  }
});
