import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { formatDate } from '../../../utils';
import styles from './styles';

export default class Trip extends Component {

  static propTypes = {
    isPublic: PropTypes.bool,
    locality: PropTypes.string,
    formattedAddress: PropTypes.string,
  }

  render() {

    const {
      isPublic,
      locality,
      formattedAddress,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>Trip</Text>
          <Text style={styles.address}>{formattedAddress}</Text>
        </View>
        <View style={styles.bottom}></View>
      </View>
    );
  }
}



