import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const face = require('../../../assets/hj.jpg');

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

const ContactListItem = ({ contact }) => {

  console.log('contact', contact);

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
              <Text style={styles.nameText}>{contact.firstName} {contact.lastName}</Text>
            </View>
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
