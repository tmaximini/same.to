import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, TouchableHighlight } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import _ from 'lodash';
import { getUserId } from '../../services/api';
import { COLORS } from '../../constants';
import styles from './styles';

const bubbleStyle = {
  left: {
    backgroundColor: '#f0f0f0',
  },
  right: {
    backgroundColor: COLORS.CYAN,
  }
};


export default class Chat extends Component {

  static propTypes = {
    chat: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
    fetchChats: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisonnect = this.onDisonnect.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.getUserNameById = this.getUserNameById.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
    this.appendMessages = this.appendMessages.bind(this);
    this.transformMessageFormat = this.transformMessageFormat.bind(this);
  }

  componentWillMount() {
    // bind socket listeners
    this.onConnect();
    const { messages } = this.props.chat;
    this.setState({
      messages: messages.map(this.transformMessageFormat)
    });
  }

  componentWillUnmount() {
    this.onDisonnect();
  }

  onConnect() {
    const { socket, chat } = this.props;
    socket.emit('join', chat.id);
    socket.on('message', this.onReceive);
  }

  onDisonnect() {
    console.log('unmouting chat');
    const { socket, chat } = this.props;
    // refresh chat list
    this.props.fetchChats();
    socket.emit('leave', chat.id);
    socket.disconnect();
  }

  onSend(messages = []) {
    const { socket } = this.props;
    const msg = {
      text: messages[0].text,
    };
    socket.emit('message', msg);
    this.appendMessages(messages);
  }

  onReceive(msg) {
    const mappedMsg = this.transformMessageFormat(msg);
    // don't append our own messages
    if (msg.fromId !== getUserId()) {
      this.appendMessages([mappedMsg]);
    }
  }

  getUserNameById(id) {
    const { members } = this.props.chat;
    const user = _.find(members, { id });
    return `${user.firstName} ${user.lastName}`;
  }

  getAvatar(id) {
    const { members } = this.props.chat;
    const user = _.find(members, { id });
    // console.log('user', user);
    return user.image && user.image.thumbs['100x100']
      ? user.image.thumbs['100x100']
      : 'https://facebook.github.io/react/img/logo_og.png';
  }


  /**
   * maps message to the expected format of gifted-chat
   // {
   //   _id: 1,
   //   text: 'Hello developer',
   //   createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
   //   user: {
   //     _id: 2,
   //     name: 'React Native',
   //     avatar: 'https://facebook.github.io/react/img/logo_og.png',
   //   },
   // },
   */
  transformMessageFormat(msg) {
    return {
      _id: msg.id,
      text: msg.text,
      createdAt: msg.createdAt,
      user: {
        _id: msg.fromId,
        name: this.getUserNameById(msg.fromId),
        avatar: this.getAvatar(msg.fromId),
      },
    };
  }

  appendMessages(messages) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    if (
      props.isSameUser(props.currentMessage, props.previousMessage)
      && props.isSameDay(props.currentMessage, props.previousMessage)
    ) {
      return (
        <Bubble
          {...props}
          wrapperStyle={bubbleStyle}
        />
      );
    }
    // console.log(props);
    const name = (
      props.position === 'right'
      ? null // 'Ich'
      : props.currentMessage.user.name
    );
    return (
      <View>
        <View style={[styles.nameWrapper, styles[props.position]]}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Bubble
          {...props}
          wrapperStyle={bubbleStyle}
        />
      </View>
    );
  }

  renderSend() {
    return (
      <TouchableHighlight
        onPress={this.onSend}
      >
        <Text style={styles.send}>Send</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          renderBubble={this.renderBubble}
          user={{
            _id: getUserId(),
          }}
        />
      </View>
    );
  }
}
