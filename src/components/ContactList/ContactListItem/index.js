import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserId } from '../../../services/api';
import styles from './styles';

const fallback = require('../../../assets/hj.jpg');

const isMe = c => c.id === getUserId();

const isContact = c => false; // TODO
const isFavorite = c => false; // TODO

const getName = c => (
  `${c.firstName} ${c.lastName}`
);
const getLocation = c => (
  c.location ? c.location.locality : 'Unknown'
);
const getOccupaction = c => {
  if (c.occupation && c.company) {
    return `${c.occupation} bei ${c.company}`;
  } else if (c.occupation) {
    return c.occupation;
  } else if (c.company) {
    return c.company;
  }
  return null;
};

const getInterests = c => (
  (c.interests && c.interests.length > 0)
    ? c.interests.join(', ')
    : ''
);
const getAvatar = c => (
  c && c.image && c.image.thumbs ? { uri: c.image.thumbs['320x320'] } : fallback
);

const ContactListItem = ({ contact, addFavorite, addContact }) => {
  const editFunc = () => Actions.editCreateProfile({
    profile: contact,
    title: 'Edit Profile'
  });
  const handler = () => Actions.profile({
    profile: contact,
    title: getName(contact),
    onRight: isMe(contact) ? editFunc : undefined,
    rightTitle: isMe(contact) ? 'edit' : undefined,
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
          {!isMe(contact) && (
            <View style={styles.actions}>
              <TouchableHighlight
                style={styles.iconButton}
                onPress={() => addFavorite(contact)}
                activeOpacity={0.6}
                underlayColor="transparent"
              >
                <Icon
                  name="ios-star"
                  style={styles.icon}
                  size={23}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.iconButton}
                onPress={() => addContact(contact)}
                activeOpacity={0.6}
                underlayColor="transparent"
              >
                <Icon
                  name={isContact(contact) ? 'ios-person-add' : 'ios-person-add'}
                  style={styles.icon}
                  size={23}
                />
              </TouchableHighlight>
            </View>
          )}
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
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired,
};

export default ContactListItem;
