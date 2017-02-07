import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { canEdit } from '../../../utils';
import styles from './styles';

// const background = require('../../../assets/sunflowers.jpg');
const face = require('../../../assets/hj.jpg');

const ChatListItem = ({ chat, setCurrentChat, setChat }) => {

  return (
    <View style={styles.container}>
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
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.actions}>
            <Text>8:30</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <View style={styles.workAndInterest}>
            <Text style={styles.workText}>blabla</Text>
            <Text style={styles.interests}>blabla</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  // setCurrentChat: PropTypes.func.isRequired,
  // setChat: PropTypes.func.isRequired,
};

export default ChatListItem;
