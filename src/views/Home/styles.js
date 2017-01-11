import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'stretch',
    bottom: 55,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  newButton: {
    backgroundColor: 'black',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

