import React, { PropTypes } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import EditButton from '../../EditButton';
import Date from '../../Date';
import Location from '../../Location';
import TagList from '../../TagList';
import { canEdit } from '../../../utils';
import styles from './styles';

const eventFallback = require('../../../assets/Fallback_Event.png');
const activityFallback = require('../../../assets/Fallback_Activity.png');

const getEventImage = event => {
  if (
    event && event.image && event.image.thumbs && event.image.thumbs['960x640']
  ) {
    return { uri: event.image.thumbs['960x640'] };
  }
  // otherwise use fallbacks
  return event.type === 'event' ? eventFallback : activityFallback;
};

const noop = () => {};

const EventListItem = ({
  event,
  setCurrentEvent,
  setEvent,
  setDetail,
  setActivity,
  deleteEvent,
  showActionSheetWithOptions,
  isArchive
}) => {
  const { name, startAt, location } = event;

  // functions to be called on Acionsheed edit button
  const editEvent = isArchive
    ? noop
    : () => {
      setEvent(event);
      Actions.editCreateEvent({ event, title: I18n.t('edit_event') });
    };
  const editActivity = isArchive
    ? noop
    : () => {
      setActivity(event);
      Actions.editCreateActivity({
        activity: event,
        title: I18n.t('edit_activity')
      });
    };

  const showAndHandleActionSheet = isArchive
    ? noop
    : () => {
      const options = [I18n.t('edit'), I18n.t('delete'), I18n.t('cancel')];
      const destructiveButtonIndex = 1;
      const cancelButtonIndex = 2;
      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          destructiveButtonIndex
        },
          buttonIndex => {
            // Do something here depending on the button index selected
            if (buttonIndex === 0) {
              // edit
              if (event.type === 'event') {
                return editEvent();
              }
              return editActivity();
            }
            if (buttonIndex === 1) {
              // delete
              return deleteEvent(event);
            }
            return null;
          }
        );
    };

  const renderRightButton = () => (
    <EditButton onPress={showAndHandleActionSheet} />
  );

  // set current event in reducer
  const onSelect = () => {
    if (event.type === 'event') {
      setCurrentEvent(event);
      Actions.event({
        renderRightButton: !isArchive && canEdit(event)
          ? renderRightButton
          : undefined,
        isArchive
      });
    } else {
      setDetail({ itemType: 'activity', item: event });
      Actions.activity({
        title: event.name,
        renderRightButton: !isArchive && canEdit(event)
          ? renderRightButton
          : undefined,
        isArchive
      });
    }
  };

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onSelect}
      activeOpacity={0.6}
      underlayColor="transparent"
    >
      <Image
        source={getEventImage(event)}
        style={styles.bgImage}
        borderRadius={5}
      >
        <View style={styles.wrapper}>
          <View style={styles.top}>
            {event.categories &&
              <TagList align="flex-start" tags={event.categories} />}
          </View>
          <View style={styles.middle}>
            <View style={styles.main}>
              <View style={styles.headline}>
                <Text style={styles.title}>
                  {name}
                </Text>
                <Icon
                  size={34}
                  name="ios-arrow-forward"
                  style={styles.titleCaret}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            {location && <Location location={location} />}
            {startAt && <Date date={startAt} />}
          </View>
        </View>
      </Image>
    </TouchableHighlight>
  );
};

EventListItem.propTypes = {
  event: PropTypes.object.isRequired,
  setCurrentEvent: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
  setActivity: PropTypes.func.isRequired,
  setDetail: PropTypes.func.isRequired,
  showActionSheetWithOptions: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  isArchive: PropTypes.bool.isRequired
};

export default EventListItem;
