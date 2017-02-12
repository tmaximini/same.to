import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import CheckboxItem from './CheckboxItem';
import styles from './styles';

const CheckboxList = ({ label, items, model, onChange }) => (
  <View style={styles.container}>
    {label && (
      <Text style={styles.checkboxLabel}>
        {label}
      </Text>
    )}
    <View style={styles.itemWrapper}>
      {items.map((item, index) => <CheckboxItem
        item={item}
        key={index}
        onChange={onChange}
        active={model.categories.indexOf(item) > -1}
      />)}
    </View>
  </View>
);

CheckboxList.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  model: PropTypes.object,
  onChange: PropTypes.func,
};

export default CheckboxList;
