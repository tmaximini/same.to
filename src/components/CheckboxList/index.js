import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import CheckboxItem from './CheckboxItem';
import styles from './styles';

class CheckboxList extends Component {

  static propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
  }

  render() {
    const { items, onChange } = this.props;

    return (
      <View style={styles.container}>
        {items.map((item, index) => <CheckboxItem
          item={item}
          key={index}
          onChange={onChange}
        />)}
      </View>
    );
  }
}

export default CheckboxList;
