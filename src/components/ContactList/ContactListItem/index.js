import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const fallback = require('../../../assets/hj.jpg');

const getName = c => (
  `${c.firstName} ${c.lastName}`
);
const getLocation = c => (
  c.location ? c.location.locality : 'Unknown'
);
const getOccupaction = c => (
  `${c.occupation} bei ${c.company}`
);
const getInterests = c => (
  (c.interests && c.interests.length > 0)
    ? c.interests.join(', ')
    : ''
);
const getAvatar = c => (
  c && c.image && c.image.thumbs ? { uri: c.image.thumbs['320x320'] } : fallback
);

const ContactListItem = ({ contact }) => {

  const handler = () => Actions.profile({
    profile: contact,
    title: getName(contact),
  });

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.left}>
          <TouchableHighlight
            style={styles.avatar}
            onPress={handler}
          >
            <Image
              source={getAvatar(contact)}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableHighlight>
          <View style={styles.personDetails}>
            <TouchableHighlight
              style={styles.name}
              onPress={handler}
            >
              <Text style={styles.nameText}>{getName(contact)}</Text>
            </TouchableHighlight>
            <View style={styles.location}>
              <Text style={styles.locationText}>{getLocation(contact)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.actions}>
            <TouchableHighlight
              style={styles.iconButton}
            >
              <Icon
                name="ios-star"
                style={styles.icon}
                size={23}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.iconButton}
            >
              <Icon
                name="ios-person-add"
                style={styles.icon}
                size={23}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.left}>
          <View style={styles.workAndInterest}>
            <Text style={styles.workText}>{getOccupaction(contact)}</Text>
            <Text style={styles.interests}>{getInterests(contact)}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.actions}>
            <View style={styles.iconButton}>
              <Icon
                name="ios-checkmark"
                size={22}
                style={{ color: 'white' }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactListItem;
