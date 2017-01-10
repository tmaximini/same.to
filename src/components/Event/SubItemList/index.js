import React, { Component, PropTypes } from 'react';
import { View, ListView, Text } from 'react-native';
import styles from './styles';


export default class SubItemList extends Component {

  static propTypes = {
    trips: PropTypes.array.isRequired,
    accommodations: PropTypes.array.isRequired,
  }

  render() {
    const {
      accommodations,
      trips,
    } = this.props;

    return (
      <View style={styles.container}>
        {accommodations.map(ac => <Text key={ac.id}>{ac.name}</Text>)}
        {trips.map(trip => <Text key={trip.id}>{trip.locality}</Text>)}
      </View>
    );
  }
}

