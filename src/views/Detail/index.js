import React, { PropTypes } from 'react';
import { View } from 'react-native';
import ItemDetail from '../../components/ItemDetail';
import styles from './styles';

const Detail = ({ item, ...rest }) => (
  <View style={styles.container}>
    <ItemDetail
      item={item}
      {...rest}
    />
  </View>
);

Detail.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Detail;
