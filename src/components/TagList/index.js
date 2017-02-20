import React from 'react';
import { View } from 'react-native';
import I18n from 'react-native-i18n';
import Tag from './Tag';
import styles from './styles';

const TagList = ({ tags, align }) => (
  <View style={[styles.container, { alignItems: align || 'center' }]}>
    {tags.map((tag, index) => <Tag key={index} tag={I18n.t(tag)} />)}
  </View>
);

export default TagList;
