import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  actions as chatActions
} from '../../redux/modules/chats';
import ChatList from '../../components/ChatList';
import styles from './styles';

@connect(
  state => state.chats,
  chatActions,
)
class Chats extends Component {
  static propTypes = {
    chats: PropTypes.arrayOf(
      PropTypes.object,
    ),
    setCurrentChat: PropTypes.func.isRequired,
    fetchChats: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.fetchChats();
  }

  render() {
    console.log('this.props', this.props);

    const {
      chats,
      isRefreshing,
      fetchChats,
      setCurrentChat,
    } = this.props;
    return (
      <View style={styles.container}>
        <ChatList
          chats={chats}
          setCurrentChat={setCurrentChat}
          isRefreshing={isRefreshing}
          refresh={fetchChats}
        />
      </View>
    );
  }
}

export default Chats;
