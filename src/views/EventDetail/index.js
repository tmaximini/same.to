import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import { formatDate } from '../../utils';
import styles from './styles';


export default class Event extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  render() {
    const {
      name,
      type,
      description,
      isPublic,
      startAt,
    } = this.props.event;

    return (
      <View>
        <Text>EVENT!!!</Text>
        <Text>{name}</Text>
        <Text>{type}</Text>
        <Text>{description}</Text>
        <Text>{isPublic}</Text>
        <Text>{formatDate(startAt)}</Text>
      </View>
    );
  }
}

