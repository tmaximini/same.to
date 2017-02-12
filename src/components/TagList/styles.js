import { StyleSheet } from 'react-native';

import { MIXINS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...MIXINS.floatLeft,
  },
});
