import React from 'react';
import { View } from 'react-native';
import Tag from './Tag';
import styles from './styles';

const TagList = ({ tags }) => (
  <View style={styles.container}>
    {tags.map((tag, index) => <Tag key={index} tag={tag} />)}
  </View>
);

export default TagList;
