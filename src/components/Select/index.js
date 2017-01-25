import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Item = Picker.Item;

const Select = ({ icon, value, onChange, items, placeholder, ...rest }) => (
  <View style={styles.inputWrap}>
    <Picker
      mode="dropdown"
      iosHeader={placeholder}
      style={styles.select}
      itemStyle={{ color: 'white' }}
      selectedValue={value}
      onValueChange={onChange}
      {...rest}
    >
      {items.map((item, index) => <Item key={index} label={item.label} value={item.value} />)}
    </Picker>
    {icon && (
      <Icon
        name={icon}
        style={styles.icon}
        size={20}
      />
    )}
  </View>
);

Select.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func,
  items: PropTypes.array,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  onChange: () => {},
  items: [],
  icon: 'caret-down',
  placeholder: 'select one'
};

export default Select;
