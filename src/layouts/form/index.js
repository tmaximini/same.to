import React, { PropTypes } from 'react';
import { View } from 'react-native';
import KeyboardScroll from '../../components/KeyboardScroll';
import styles from './styles';

const Form = ({ children }) => (
  <View style={styles.container}>
    <KeyboardScroll
      extraScrollHeight={20}
    >
      {children}
    </KeyboardScroll>
  </View>
);

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
};

export default Form;
