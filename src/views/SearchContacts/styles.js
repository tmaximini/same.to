import { StyleSheet } from 'react-native';
import { PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  sliderWrap: {
    marginBottom: PADDINGS.STANDARD,
  },
  radius: {
    marginBottom: PADDINGS.STANDARD / 2,
    ...MIXINS.topInfo,
    fontSize: 14,
  }
});
