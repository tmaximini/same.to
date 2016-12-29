import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';

import styles from './styles';


export const VerticalCentered = ({ children = undefined, style = {} }) => {
  return (
    <View style={[styles.verticalCentered, style]}>{children}</View>
  );
};

VerticalCentered.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  style: PropTypes.object
};

export const WithPadding = ({ children = undefined, style = {} }) => {
  return (
    <View style={[styles.withPadding, style]}>{children}</View>
  );
};

WithPadding.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  style: PropTypes.object
};

export const Bottom = ({ children = undefined, style = {} }) => {
  return (
    <View style={[styles.bottom, style]}>{children}</View>
  );
};

Bottom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  style: PropTypes.object
};
