import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import Chat from '../../components/Chat';
import styles from './styles';

class ChatView extends Component {

  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Chat />
      </View>
    );
  }
}

export default ChatView;
