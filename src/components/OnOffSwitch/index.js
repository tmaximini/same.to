import React, { PropTypes } from 'react';
import { View, Text, Switch } from 'react-native';
import styles from './styles';

const OnOffSwitch = ({ name, value, onChange, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.label}>
      {name}
    </Text>
    <Switch
      onValueChange={onChange}
      style={styles.switch}
      value={value}
    />
  </View>
);

OnOffSwitch.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default OnOffSwitch;
