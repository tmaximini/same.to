import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import {
  actions as chatActions
} from '../../redux/modules/chats';
import {
  API_BASE,
  getAuthToken,
} from '../../services/api';
import Chat from '../../components/Chat';
import styles from './styles';


@connect(
  state => state.chats,
  chatActions,
)
class ChatView extends Component {

  static propTypes = {
    currentChat: PropTypes.object,
    fetchChats: PropTypes.func.isRequired,
  }

  render() {
    const { currentChat, fetchChats } = this.props;
    const socket = socketIOClient(`${API_BASE}conversations?access_token=${getAuthToken()}`);

    return (
      <View style={styles.container}>
        <Chat
          chat={currentChat}
          socket={socket}
          fetchChats={fetchChats}
        />
      </View>
    );
  }
}

export default ChatView;
