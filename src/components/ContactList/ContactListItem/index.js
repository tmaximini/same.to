import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const ContactListItem = ({ contact }) => (
  <View style={styles.container}>
    <Text>{contact.firstName} {contact.lastName}</Text>
  </View>
);

ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactListItem;
