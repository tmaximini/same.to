import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class CheckboxItem extends Component {

  static propTypes = {
    item: PropTypes.string,
    onChange: PropTypes.func,
  }

  render() {
    const { item, onChange } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.trigger}
          onPress={() => console.log(item)}
        >
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CheckboxItem;
