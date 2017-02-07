import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
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
  }

  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.getUserNameById = this.getUserNameById.bind(this);
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
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      }))
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  getUserNameById(members, id) {
    const user = _.find(members, { id });
    return `${user.firstName} ${user.lastName}`;
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
    return (
      <View>
        <Text style={styles.name}>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
          wrapperStyle={bubbleStyle}
        />
      </View>
    );
  }

  renderSend() {
    return <Text style={styles.send}>Send</Text>;
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
    console.log('this.state.messages', this.state.messages);
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          user={{
            _id: getUserId(),
          }}
        />
      </View>
    );
  }
}
