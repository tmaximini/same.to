import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ItemDetail from '../../components/ItemDetail';
import {
  actions as detailActions
} from '../../redux/modules/detail';
import {
  createChat
} from '../../redux/modules/chats';
import { getUserId } from '../../services/api';
import styles from './styles';

@connect(
  state => state.detail,
  {
    ...detailActions,
    createChat
  }
)
export default class Detail extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    toggleParticipate: PropTypes.func.isRequired,
    createChat: PropTypes.func.isRequired,
  };

  render() {
    const userId = getUserId();
    const { item, toggleParticipate, ...rest } = this.props;

    return (
      <View style={styles.container}>
        <ItemDetail
          item={item}
          participates={item.memberIds.includes(userId)}
          createChat={createChat}
          onToggle={toggleParticipate}
          {...rest}
        />
      </View>
    );
  }

}
