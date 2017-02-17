import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
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
    <Text style={styles.itemText}>{I18n.t(item)}</Text>
  </View>
);


CheckboxItem.propTypes = {
  item: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxItem;
