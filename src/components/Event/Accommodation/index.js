import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { formatDate } from '../../../utils';
import styles from './styles';

export default class Accommodation extends Component {

  static propTypes = {
    isPublic: PropTypes.bool,
    name: PropTypes.string,
    overnightStays: PropTypes.number,
    startDate: PropTypes.string,
  }

  render() {

    const {
      isPublic,
      name,
      overnightStays,
      startDate,
    } = this.props;

    console.log(startDate, formatDate(startDate));

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>Unterkunft</Text>
          <Text style={styles.date}>{formatDate(startDate)}</Text>
        </View>
        <View style={styles.bottom}>
          <Text>Bottom</Text>
        </View>
      </View>
    );
  }
}



