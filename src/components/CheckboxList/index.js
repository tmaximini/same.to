import React, { PropTypes } from 'react';
import { View } from 'react-native';
import CheckboxItem from './CheckboxItem';
import styles from './styles';

const CheckboxList = ({ items, model, onChange }) => (
  <View style={styles.container}>
    {items.map((item, index) => <CheckboxItem
      item={item}
      key={index}
      onChange={onChange}
      active={model.categories.indexOf(item) > -1}
    />)}
  </View>
);

CheckboxList.propTypes = {
  items: PropTypes.array,
  model: PropTypes.object,
  onChange: PropTypes.func,
};

export default CheckboxList;
