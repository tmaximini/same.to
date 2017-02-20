import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { share } from '../../utils';
import { getUserId } from '../../services/api';
import EventHeader from '../../components/EventHeader';
import SubItemList from '../../components/SubItemList';
import PlusButton from '../../components/PlusButton';

import {
  setTrip as setTripAction,
  resetTrip as resetTripAction,
  deleteTrip as deleteTripAction,
} from '../../redux/modules/editCreateTrip';
import {
  toggleParticipateEvent as toggleParticipateEventAction
} from '../../redux/modules/events';
import {
  setAccommodation as setAccommodationAction,
  resetAccommodation as resetAccommodationAction,
  deleteAccommodation as deleteAccommodationAction,
} from '../../redux/modules/editCreateAccommodation';
import {
  setActivity as setActivityAction,
  resetActivity as resetActivityAction,
  deleteActivity as deleteActivityAction,
} from '../../redux/modules/editCreateActivity';
import {
  setDetail as setDetailAction,
} from '../../redux/modules/detail';
import styles from './styles';

const background = require('../../assets/gamescom.jpg');


@connect(
  state => ({
    event: state.events.currentEvent,
    profile: state.editCreateProfile.profile,
  }),
  {
    setTrip: setTripAction,
    setAccommodation: setAccommodationAction,
    setActivity: setActivityAction,
    resetTrip: resetTripAction,
    resetAccommodation: resetAccommodationAction,
    resetActivity: resetActivityAction,
    setDetail: setDetailAction,
    toggleParticipateEvent: toggleParticipateEventAction,
    deleteTrip: deleteTripAction,
    deleteAccommodation: deleteAccommodationAction,
    deleteActivity: deleteActivityAction,
  },
)
@connectActionSheet
export default class Event extends Component {
  static propTypes = {
    event: PropTypes.shape({
      members: PropTypes.array.isRequired,
      trips: PropTypes.array.isRequired,
      activities: PropTypes.array.isRequired,
      accommodations: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    setTrip: PropTypes.func.isRequired,
    setAccommodation: PropTypes.func.isRequired,
    setActivity: PropTypes.func.isRequired,
    setDetail: PropTypes.func.isRequired,
    resetTrip: PropTypes.func.isRequired,
    resetActivity: PropTypes.func.isRequired,
    resetAccommodation: PropTypes.func.isRequired,
    toggleParticipateEvent: PropTypes.func.isRequired,
    showActionSheetWithOptions: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.editAccommodation = this.editAccommodation.bind(this);
    this.editTrip = this.editTrip.bind(this);
  }

  editAccommodation() {
    Actions.editAccommodation({ event: this.props.event });
  }

  editTrip() {
    Actions.editTrip({ event: this.props.event });
  }

  render() {
    const {
      setTrip,
      setAccommodation,
      setActivity,
      resetTrip,
      resetActivity,
      resetAccommodation,
      setDetail,
      event,
      toggleParticipateEvent,
      showActionSheetWithOptions,
    } = this.props;
    const {
      name,
      // isPublic,
      // startAt,
      activities,
      accommodations,
      trips,
      members,
      memberIds,
      type,
      id,
    } = event;

    const hasSubItems = accommodations.length || trips.length || activities.length;
    const isEvent = type === 'event';

    const getMiddleBoxStyles = () => (isEvent ? styles.box : [styles.box, styles.lastBox]);

    const getHeader = () => (
      <EventHeader
        event={event}
        background={background}
        onToggle={() => toggleParticipateEvent(event)}
        participates={memberIds.includes(getUserId())}
      />
    );

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {getHeader()}
          <View style={styles.details}>
            <View style={styles.buttons}>
              <TouchableHighlight
                style={styles.box}
                onPress={share({
                  message: 'check out this event',
                  url: `sameto://events/${id}`,
                  title: `Same.to: ${name}`
                })}
              >
                <Text style={styles.boxText}>{I18n.t('share')}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={getMiddleBoxStyles()}
                onPress={share({
                  message: `Join me with ${name}`,
                  url: `sameto://events/${id}`,
                  title: `Same.to: ${name}`
                })}
              >
                <Text style={styles.boxText}>{I18n.t('invite')}</Text>
              </TouchableHighlight>
              {isEvent && (
                <TouchableHighlight
                  style={[styles.box, styles.lastBox]}
                  onPress={() => Actions.participants({ members })}
                >
                  <Text style={styles.boxText}>{I18n.t('participants')}</Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          {hasSubItems ? (
            <SubItemList
              trips={trips}
              accommodations={accommodations}
              activities={activities}
              setTrip={setTrip}
              setAccommodation={setAccommodation}
              setActivity={setActivity}
              setDetail={setDetail}
              showActionSheetWithOptions={showActionSheetWithOptions}
              {...this.props}
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                {I18n.t('no_subitems_yet')}
              </Text>
            </View>
          )}

          {isEvent && <PlusButton
            itemSize={45}
            radius={80}
            startDegree={225}
            endDegree={315}
            items={[
              {
                title: 'trip',
                action: () => {
                  resetTrip();
                  Actions.editCreateTrip({ eventId: id });
                },
                icon: 'car'
              },
              {
                title: 'accomodation',
                action: () => {
                  resetAccommodation();
                  Actions.editCreateAccommodation({ eventId: id });
                },
                icon: 'bed'
              },
              {
                title: 'activity',
                action: () => {
                  resetActivity();
                  Actions.editCreateActivity({ eventId: id });
                },
                icon: 'coffee'
              }
            ]}
          />
          }
        </View>
      </View>
    );
  }
}
