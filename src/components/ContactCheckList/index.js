import React, { PropTypes } from 'react';
import { View } from 'react-native';
import ContactCheckListItem from './ContactCheckListItem';
import { getUserId } from '../../services/api';
import styles from './styles';

const ContactCheckList = ({ members, onToggle, activeMemberIds }) => (
  <View style={styles.container}>
    {members.map(member => (member.id !== getUserId()) && (
      <ContactCheckListItem
        key={member.id}
        contact={member}
        onToggle={onToggle}
        isActive={activeMemberIds.includes(member.id)}
      />
    ))}
  </View>
);

ContactCheckList.propTypes = {
  members: PropTypes.array,
  activeMemberIds: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
};

export default ContactCheckList;
