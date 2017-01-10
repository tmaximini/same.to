import React, { PropTypes } from 'react';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const { Item } = ActionButton;

const PlusButton = ({ items }) => (
  <ActionButton buttonColor="rgba(231,76,60,1)">
    {items.map((item, index) => {
      return (
        <Item
          key={index}
          title={item.title}
          buttonColor={item.color || '#9b59b6'}
          onPress={item.action}
        >
          <Icon name={item.icon} style={styles.actionButtonIcon} />
        </Item>
      );
    })}
  </ActionButton>
);

PlusButton.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    action: PropTypes.func,
    color: PropTypes.string,
    icon: PropTypes.string
  }))
};

export default PlusButton;
