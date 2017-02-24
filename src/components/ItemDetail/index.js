import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { share } from '../../utils';
import ContactList from '../ContactList';
import EventHeader from '../EventHeader';
import Button from '../Button';
import styles from './styles';

const tripFallback = require('../../assets/Fallback_Trip.png');
const accoFallback = require('../../assets/Fallback_Accomodity.png');
const activityFallback = require('../../assets/Fallback_Activity.png');

const { width } = Dimensions.get('window');

const getTitle = (itemType, item) => {
  switch (itemType) {
    case 'trip':
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text numberOfLines={1} style={[styles.title]}>
            {item.pickupLocation ? item.pickupLocation.locality : ''}
          </Text>
          <Icon
            size={34}
            name="ios-arrow-forward"
            style={[styles.titleCaret, { top: width > 320 ? 0 : -4 }]}
          />
          <Text numberOfLines={1} style={styles.title}>
            {item.destinationLocation ? item.destinationLocation.locality : ''}
          </Text>
        </View>
      );
    default:
      return (
        <Text numberOfLines={1} style={styles.title}>
          {item.name || I18n.t(itemType)}
        </Text>
      );
  }
};

const getImage = (itemType) => {
  switch (itemType) {
    case 'trip':
      return tripFallback;
    case 'accommodation':
      return accoFallback;
    default:
      return activityFallback;
  }
};


const ItemDetail = ({ itemType, participates, onToggle, item, resetChat, profile, ...rest }) => (
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
        background={getImage(itemType)}
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
            <Text style={styles.boxText}>{I18n.t('share')}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.box, styles.lastBox]}
            onPress={share({
              message: `check out this ${itemType}`,
              url: `sameto://events/${item.eventId}/${itemType}s/${item.id}`,
              title: `${item.name} - ${itemType}`
            })}
          >
            <Text style={styles.boxText}>{I18n.t('invite')}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    <View style={styles.bottom}>
      <ContactList
        {...rest}
        profile={profile}
        contacts={item.members}
      />
    </View>
    <View style={styles.actionButtons}>
      <Button
        text={I18n.t('create_chat')}
        disabled={(item.members && item.members.length < 2) || !participates}
        onPress={() => {
          resetChat();
          Actions.editCreateChat({
            proposedMembers: item.members,
          });
        }}
        style={{ width: (width / 2) - 15 }}
        smallText
      />
      <Button
        text={I18n.t('all_participants')}
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
  profile: PropTypes.object.isRequired,
};

export default ItemDetail;
