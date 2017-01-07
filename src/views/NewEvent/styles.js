import {
  StyleSheet,
  PixelRatio,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  inputRow: {
    borderBottomColor: '#47315a',
    borderBottomWidth: 1 / PixelRatio.get(),
    flex: 1,
  }
});

