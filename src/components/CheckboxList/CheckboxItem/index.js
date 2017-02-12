import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const nafta = require('../../../assets/nafta.png');

const CheckboxItem = ({ item, onChange, active }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.circle}
      onPress={() => onChange(item)}
      activeOpacity={0.8}
    >
      {/*<Image
        source={nafta}
        style={styles.image}
        resizeMode="cover"
      >*/}
      <View style={styles.inactive}>
        {active && <View
          style={styles.checked}
        >
          <Icon
            name="check"
            size={22}
            style={styles.icon}
          />
        </View>}
      </View>
      {/*</Image>*/}

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
