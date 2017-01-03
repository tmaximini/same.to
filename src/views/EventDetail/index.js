import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default class Event extends Component {

  render() {
    return (
      <View>
        <Text>EVENT!!!</Text>
      </View>
    );
  }
}

