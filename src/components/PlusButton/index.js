import React, { PropTypes } from 'react';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { COLORS } from '../../constants';

const { Item } = ActionButton;

const PlusButton = ({ items, ...rest }) => (
  <ActionButton
    buttonColor={COLORS.CYAN}
    {...rest}
  >
    {items.length > 0 && items.map((item, index) => {
      return (
        <Item
          key={index}
          title={item.title}
          buttonColor={item.color || COLORS.CYAN}
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

PlusButton.defaultProps = {
  items: []
};

export default PlusButton;
