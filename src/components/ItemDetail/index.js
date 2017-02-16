import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { share } from '../../utils';
import ContactList from '../ContactList';
import EventHeader from '../EventHeader';
import Button from '../Button';
import styles from './styles';

const plansee = require('../../assets/plansee.jpg');

const { width } = Dimensions.get('window');

const getTitle = (itemType, item) => {
  switch (itemType) {
    case 'trip':
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text numberOfLines={1} style={[styles.title]}>
            {item.pickupLocation ? item.pickupLocation.locality : 'unknown'}
          </Text>
          <Icon
            size={34}
            name="ios-arrow-forward"
            style={styles.titleCaret}
          />
          <Text numberOfLines={1} style={styles.title}>
            {item.destinationLocation ? item.destinationLocation.locality : 'unknown'}
          </Text>
        </View>
      );
    default:
      return (
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
      );
  }
};

const ItemDetail = ({ itemType, participates, onToggle, item, resetChat, ...rest }) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <EventHeader
        event={item}
        onToggle={() => onToggle({
          item,
          itemType
        })}
        participates={participates}
        renderTitle={() => getTitle(itemType, item)}
        background={plansee}
      />
      <View style={styles.details}>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.box}
            onPress={share({
              message: `check out this ${itemType}`,
              url: `sameto://events/${item.eventId}/${itemType}s/${item.id}`,
              title: `${item.name} - ${itemType}`
            })}
          >
            <Text style={styles.boxText}>Share</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.box, styles.lastBox]}
            onPress={share({
              message: `check out this ${itemType}`,
              url: `sameto://events/${item.eventId}/${itemType}s/${item.id}`,
              title: `${item.name} - ${itemType}`
            })}
          >
            <Text style={styles.boxText}>Invite</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    <View style={styles.bottom}>
      <ContactList
        contacts={item.members}
        {...rest}
      />
    </View>
    <View style={styles.actionButtons}>
      <Button
        text="Chat erstellen"
        disabled={(item.members && item.members.length < 2) || !participates}
        onPress={() => {
          resetChat();
          Actions.editCreateChat({
            proposedSubject: item.name,
            proposedMembers: item.members,
          });
        }}
        style={{ width: (width / 2) - 15 }}
        smallText
      />
      <Button
        text="Alle Teilnehmer"
        onPress={() => Actions.participants({ members: item.members })}
        style={{ width: (width / 2) - 15 }}
        smallText
        disabled={item.memberIds.length === 0}
      />
    </View>
  </View>
);

ItemDetail.propTypes = {
  itemType: PropTypes.string,
  item: PropTypes.object.isRequired,
  participates: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  resetChat: PropTypes.func.isRequired,
};

export default ItemDetail;
