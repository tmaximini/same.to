import React, { PropTypes } from 'react';
import {
  View,
  TextInput,
  Image
} from 'react-native';

import styles from './styles';


const Input = (props) => {
  const {
    icon,
    ...rest,
  } = props;

  return (
    <View style={styles.inputWrap}>
      {icon && (
        <View style={styles.iconWrap}>
          <Image
            source={icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      )}
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  );
};

Input.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default Input;
