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
    bottom: 30,
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
  plus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  }
});

