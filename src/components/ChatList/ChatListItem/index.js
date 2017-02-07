import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Badge } from 'nachos-ui';
import { canEdit } from '../../../utils';
import { COLORS } from '../../../constants';
import styles from './styles';

// const background = require('../../../assets/sunflowers.jpg');
const face = require('../../../assets/hj.jpg');

const ChatListItem = ({ chat, setCurrentChat }) => {

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
                source={face}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.personDetails}>
              <View style={styles.name}>
                <Text style={styles.nameText}>{chat.subject}</Text>
              </View>
              <View style={styles.lastMessage}>
                <Text style={styles.conversation}>blabla</Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.actions}>
              <Text style={styles.dateTime}>8:30</Text>
              <Badge
                color={COLORS.CYAN}
                value={5}
              />
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
