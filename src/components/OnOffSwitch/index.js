import React, { PropTypes } from 'react';
import { View, Text, Switch } from 'react-native';
import styles from './styles';

const OnOffSwitch = ({ name, value, onChange, style, disabled = false }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.label}>
      {name}
    </Text>
    <Switch
      onValueChange={onChange}
      style={styles.switch}
      value={value}
      disabled={disabled}
    />
  </View>
);

OnOffSwitch.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default OnOffSwitch;
