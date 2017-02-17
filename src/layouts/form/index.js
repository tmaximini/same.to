import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import KeyboardScroll from '../../components/KeyboardScroll';
import Button from '../../components/Button';
import styles from './styles';

const Form = ({
  children,
  buttonText,
  onSubmit,
  buttonDisabled,
  buttonProps,
  scrollEnabled,
  extraText,
  style
}) => (
  <View style={[styles.container, style]}>
    <KeyboardScroll
      extraScrollHeight={20}
      scrollEnabled={scrollEnabled}
    >
      {children}
    </KeyboardScroll>
    {extraText && (
      <Text style={styles.extraText}>{extraText}</Text>
    )}
    {(buttonText && onSubmit) ? (
      <Button
        text={buttonText}
        onPress={onSubmit}
        disabled={buttonDisabled}
        {...buttonProps}
      />
    ) : null}
  </View>
);

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  buttonDisabled: PropTypes.bool,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  style: PropTypes.object,
  extraText: PropTypes.string,
  buttonProps: PropTypes.object,
  scrollEnabled: PropTypes.bool,
};

Form.defaultProps = {
  buttonDisabled: false,
  onSubmit: () => {},
  style: {},
  scrollEnabled: true
};

export default Form;
