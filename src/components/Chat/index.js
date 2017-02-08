import React, { Component, PropTypes } from 'react';
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


export default class Example extends Component {

  static propTypes = {
    chat: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.getUserNameById = this.getUserNameById.bind(this);
    this.getAvatar = this.getAvatar.bind(this);
  }

  componentWillMount() {
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     },
    //   ],
    // });
    const { messages, members } = this.props.chat;
    this.setState({
      messages: messages.map(msg => ({
        _id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          _id: msg.fromId,
          name: this.getUserNameById(members, msg.fromId),
          avatar: this.getAvatar(members, msg.fromId),
        },
      }))
    });
  }

  onConnect() {
    const { socket, chat } = this.props;
    socket.emit('join', chat.id);
    socket.on('message', this.onReceive);
  }

  onSend(messages = []) {
    this.props.socket.emit('message', { text: messages[0].text });
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onReceive(text) {
    console.log('RECEIVED SOMETHING', text);
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, {
    //       _id: Math.round(Math.random() * 1000000),
    //       text: text,
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         // avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //       },
    //     }),
    //   };
    // });
  }

  getUserNameById(members, id) {
    const user = _.find(members, { id });
    return `${user.firstName} ${user.lastName}`;
  }

  getAvatar(members, id) {
    const user = _.find(members, { id });
    // console.log('user', user);
    return user.image && user.image.thumbs['100x100']
      ? user.image.thumbs['100x100']
      : 'https://facebook.github.io/react/img/logo_og.png';
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


  // renderCustomView(props) {
  //   return (
  //     <View style={styles.container}>
  //       <View
  //         {...props}
  //       />
  //     </View>
  //   );
  // }

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
