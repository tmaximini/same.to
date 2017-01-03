import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 150,
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    flex: 23,
    paddingLeft: 10
  },
  button: {
    fontSize: 25,
    flex: 2,
    textAlign: 'left',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },

});
