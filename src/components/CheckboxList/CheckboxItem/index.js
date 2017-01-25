import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const CheckboxItem = ({ item, onChange, active }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.circle}
      onPress={() => onChange(item)}
      activeOpacity={0.8}
    >
      {active && <Icon
        name="check"
        size={22}
        style={styles.icon}
      />}

    </TouchableOpacity>
    <Text style={styles.itemText}>{item}</Text>
  </View>
);


CheckboxItem.propTypes = {
  item: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxItem;
