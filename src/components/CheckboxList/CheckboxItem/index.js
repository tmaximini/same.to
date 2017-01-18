import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const CheckboxItem = ({ item, onChange, active }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.trigger}
      onPress={() => onChange(item)}
    >
      {active && <Icon
        name="check"
        size={22}
        styles={styles.icon}
      />}
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  </View>
);


CheckboxItem.propTypes = {
  item: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxItem;
