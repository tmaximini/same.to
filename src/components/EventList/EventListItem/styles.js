import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 150,
    alignItems: 'center',
    paddingBottom: 5,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  hilite: {
    flex: 4,
    backgroundColor: 'green',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    flex: 24,
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
