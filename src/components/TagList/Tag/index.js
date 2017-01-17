import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Tag = ({ tag }) => {
  if (!tag) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
};

Tag.propTypes = {
  tag: PropTypes.string,
};

export default Tag;
