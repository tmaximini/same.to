import { StyleSheet } from 'react-native';
import { PADDINGS, MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 0,
    backgroundColor: 'transparent',
    marginBottom: PADDINGS.STANDARD,
  },
  label: {
    padding: 5,
    ...MIXINS.topInfo,
  }

});
