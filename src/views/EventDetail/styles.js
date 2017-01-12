import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 3,
  },
  bottom: {
    flex: 5,
    backgroundColor: 'green',
    padding: 10,
  },
  header: {
    flex: 4,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  details: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
  }
});
