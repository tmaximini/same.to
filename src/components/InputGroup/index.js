import React, { PropTypes } from 'react';
import { View } from 'react-native';
import styles from './styles';

const InputGroup = ({ children }) => (
  <View style={styles.container}>
    {children[0]}
    <View style={styles.spacer} />
    {children[1]}
  </View>
);

InputGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default InputGroup;
