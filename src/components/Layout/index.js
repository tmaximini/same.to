import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';

import styles from './styles';


export const VerticalCentered = ({ children = undefined }) => {
  return (
    <View style={styles.verticalCentered}>{children}</View>
  );
};

VerticalCentered.propTypes = {
  children: PropTypes.oneOf(
    PropTypes.element,
    PropTypes.array
  )
};

export const WithPadding = ({ children = undefined }) => {
  return (
    <View style={styles.withPadding}>{children}</View>
  );
};

WithPadding.propTypes = {
  children: PropTypes.oneOf(
    PropTypes.element,
    PropTypes.array
  )
};
