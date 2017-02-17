import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Badge } from 'nachos-ui';
import format from 'date-fns/format';
// import { canEdit } from '../../../utils';
import { getUserId } from '../../../services/api';
import { COLORS } from '../../../constants';
import styles from './styles';

// const background = require('../../../assets/sunflowers.jpg');
const face = require('../../../assets/hj.jpg');

const ChatListItem = ({ chat, setCurrentChat }) => {

  const me = getUserId();

  const lastMessage = (
    chat.messages.length > 0 ? chat.messages[0] : null
  );

  const getOtherMembers = () => chat.members.filter(m => m.id !== me);

  const getMembersText = () => {
    const otherMembers = getOtherMembers();

    return otherMembers.map(m => `${m.firstName} ${m.lastName}`).join(', ');
  };

  const getChatImage = () => {
    const otherMembers = getOtherMembers();

    let img = null;
    for (let i = 0; i < otherMembers.length; i++) {
      if (otherMembers[i].image && otherMembers[i].image.thumbs) {
        img = { uri: otherMembers[i].image.thumbs['320x320'] };
        break;
      }
    }

    return img || face;
  };

  const txt = (
    lastMessage
      ? `${lastMessage.from.id === me ? 'Du' : lastMessage.from.firstName}: ${lastMessage.text}`
      : null
  );

  const time = (
    lastMessage
      ? format(lastMessage.createdAt, 'HH:mm')
      : null
  );

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="transparent"
      onPress={() => {
        setCurrentChat(chat);
        Actions.chat({ title: chat.subject });
      }}
    >
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <View style={styles.left}>
            <View
              style={styles.avatar}
            >
              <Image
                source={getChatImage()}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.personDetails}>
              <View style={styles.name}>
                <Text numberOfLines={1} style={styles.nameText}>{chat.subject}</Text>
              </View>
              <View style={styles.lastUser}>
                <Text numberOfLines={1} style={styles.lastUserText}>{getMembersText()}</Text>
              </View>
              <View style={styles.lastMessage}>
                <Text numberOfLines={1} style={styles.conversation}>{txt}</Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.actions}>
              <Text style={styles.dateTime}>{time}</Text>
              {lastMessage && (
                <Badge
                  color={COLORS.CYAN}
                  value={chat.messages.length}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  setCurrentChat: PropTypes.func.isRequired,
  // setChat: PropTypes.func.isRequired,
};

export default ChatListItem;
