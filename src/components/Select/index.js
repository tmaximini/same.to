import React, { PropTypes } from 'react';
import { View, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Item = Picker.Item;

const Select = ({ icon, value, onChange, items, placeholder, ...rest }) => (
  <View style={styles.inputWrap}>
    <Picker
      iosHeader={placeholder}
      style={styles.select}
      itemStyle={{ color: '#fff', fontSize: 14, textAlign: 'left', paddingLeft: 15, borderWidth: 0 }}
      textStyle={{ borderWidth: 0 }}
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
        size={18}
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
  icon: 'sort',
  placeholder: 'select one'
};

export default Select;
