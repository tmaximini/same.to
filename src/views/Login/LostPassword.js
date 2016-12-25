import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class LostPassword extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  resetPassword = () => {
    const { navigate } = this.props;
    navigate('home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Please enter your credentials and we send you a reset link!
        </Text>
        <TouchableOpacity onPress={this.resetPassword}>
          <Text style={styles.instructions}>Reset my Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
