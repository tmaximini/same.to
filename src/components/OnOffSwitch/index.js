import React, { PropTypes } from 'react';
import { View, Text, Switch } from 'react-native';
import styles from './styles';

const OnOffSwitch = ({ name, value, onChange }) => (
  <View style={styles.container}>
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
};

export default OnOffSwitch;
