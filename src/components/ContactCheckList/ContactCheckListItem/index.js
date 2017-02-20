import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { getUserId } from '../../../services/api';
import styles from './styles';

const fallback = require('../../../assets/hj.jpg');

const ContactListItem = ({
  contact,
  addFavorite,
  addContact,
  removeFavorite,
  removeContact,
  onToggle,
  isActive,
  noIcons,
  isContact,
  isFavorite,
}) => {
  const editFunc = () => Actions.editCreateProfile({
    profile: contact,
    title: 'Edit Profile'
  });

  const isMe = () => contact.id === getUserId();

  const getName = () => (
    `${contact.firstName} ${contact.lastName}`
  );

  const handler = () => {
    if (onToggle) {
      return onToggle(contact.id);
    }
    return Actions.profile({
      profile: contact,
      title: getName(),
      onRight: isMe() ? editFunc : undefined,
      rightTitle: isMe() ? 'edit' : undefined,
    });
  };

  // helpers
  const getLocation = () => (
    contact.location ? contact.location.locality : 'Unknown'
  );
  const getOccupaction = () => {
    if (contact.occupation && contact.company) {
      return `${contact.occupation} bei ${contact.company}`;
    } else if (contact.occupation) {
      return contact.occupation;
    } else if (contact.company) {
      return contact.company;
    }
    return null;
  };

  const getInterests = () => (
    (contact.interests && contact.interests.length > 0)
      ? contact.interests.join(', ')
      : ''
  );

  const getAvatar = () => (
    contact && contact.image && contact.image.thumbs ? { uri: contact.image.thumbs['320x320'] } : fallback
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.left}>
          <TouchableHighlight
            style={styles.avatar}
            onPress={handler}
            underlayColor="transparent"
          >
            <View style={styles.imageWrapper}>
              <Image
                source={getAvatar()}
                style={styles.image}
                resizeMode="cover"
              />
              {isActive && (
                <View style={styles.checked}>
                  <FAIcon
                    name="check"
                    size={18}
                    style={{ color: '#fff' }}
                  />
                </View>
              )}
            </View>
          </TouchableHighlight>

          <View style={styles.personDetails}>
            <TouchableHighlight
              style={styles.name}
              onPress={handler}
              underlayColor="transparent"
            >
              <Text style={styles.nameText}>{getName()}</Text>
            </TouchableHighlight>
            <View style={styles.location}>
              <Text style={styles.locationText}>{getLocation()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.right}>
          {!isMe() && !noIcons && (
            <View style={styles.actions}>
              <TouchableHighlight
                style={styles.iconButton}
                onPress={() => (isFavorite ? removeFavorite(contact) : addFavorite(contact))}
                activeOpacity={0.6}
                underlayColor="transparent"
              >
                <Icon
                  name={isFavorite ? 'ios-star' : 'ios-star-outline'}
                  style={styles.icon}
                  size={23}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.iconButton}
                onPress={() => (isContact ? removeContact(contact) : addContact(contact))}
                activeOpacity={0.6}
                underlayColor="transparent"
              >
                <Icon
                  name="ios-person-add"
                  name={isContact ? 'ios-person' : 'ios-person-add-outline'}
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
            <Text style={styles.workText}>{getOccupaction()}</Text>
            <Text style={styles.interests}>{getInterests()}</Text>
          </View>
        </View>
        <View style={styles.right}>
          {!noIcons && contact.isMatch && (
            <View style={styles.actions}>
              <View style={styles.iconButton}>
                <Icon
                  name="ios-checkmark"
                  size={22}
                  style={{ color: 'white' }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  addContact: PropTypes.func,
  removeContact: PropTypes.func,
  onToggle: PropTypes.func,
  isActive: PropTypes.bool,
  noIcons: PropTypes.bool,
  isContact: PropTypes.bool,
  isFavorite: PropTypes.bool,
};

export default ContactListItem;
