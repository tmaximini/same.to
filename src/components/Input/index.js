import React, { PropTypes } from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';


const Input = ({ icon, value, style, ...rest }) => (
  <View style={[styles.inputWrap, style]}>
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholderTextColor="#999"
      returnKeyType="done"
      value={value}
      autoCapitalize="none"
      autoCorrect={false}
      {...rest}
    />
    {icon && (
      <Icon
        name={icon}
        style={styles.icon}
        size={20}
      />
    )}
  </View>
);

Input.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.object,
  value: PropTypes.string,
};

export default Input;
