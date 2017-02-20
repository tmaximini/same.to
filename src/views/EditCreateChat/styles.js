import { StyleSheet } from 'react-native';
import { MIXINS, PADDINGS } from '../../constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  labelWrapper: {
    paddingVertical: PADDINGS.STANDARD
  },
  label: {
    ...MIXINS.topInfo,
    paddingBottom: 2,
  }
});
