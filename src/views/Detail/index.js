import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ItemDetail from '../../components/ItemDetail';
import {
  actions as detailActions
} from '../../redux/modules/detail';
import {
  actions as contactActions
} from '../../redux/modules/contacts';
import {
  actions as chatActions
} from '../../redux/modules/chats';
import { getUserId } from '../../services/api';
import styles from './styles';

@connect(
  state => ({
    ...state.detail,
    ...state.editCreateProfile,
  }),
  {
    ...detailActions,
    ...contactActions,
    ...chatActions
  }
)
export default class Detail extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    toggleParticipate: PropTypes.func.isRequired,
    resetChat: PropTypes.func.isRequired,
    profile: PropTypes.object,
  };

  render() {
    const userId = getUserId();
    const { item, toggleParticipate, resetChat, profile, ...rest } = this.props;

    return (
      <View style={styles.container}>
        <ItemDetail
          {...rest}
          item={item}
          participates={item.memberIds.includes(userId)}
          contactActions={contactActions}
          onToggle={toggleParticipate}
          resetChat={resetChat}
          profile={profile}
        />
      </View>
    );
  }

}
