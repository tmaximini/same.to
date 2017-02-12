import React, { PropTypes } from 'react';
import { View } from 'react-native';
import KeyboardScroll from '../../components/KeyboardScroll';
import Button from '../../components/Button';
import styles from './styles';

const Form = ({ children, buttonText, onSubmit, buttonDisabled }) => (
  <View style={styles.container}>
    <KeyboardScroll
      extraScrollHeight={20}
    >
      {children}
    </KeyboardScroll>
    <Button
      text={buttonText}
      onPress={onSubmit}
      disabled={buttonDisabled}
    />
  </View>
);

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  buttonDisabled: false,
  onSubmit: () => {}
};

export default Form;
