import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { share } from '../../utils';
import SubItemList from '../../components/SubItemList';
import PlusButton from '../../components/PlusButton';

import {
  setTrip as setTripAction,
  resetTrip as resetTripAction
} from '../../redux/modules/editCreateTrip';
import {
  setAccommodation as setAccommodationAction,
  resetAccommodation as resetAccommodationAction,
} from '../../redux/modules/editCreateAccommodation';
import {
  setActivity as setActivityAction,
  resetActivity as resetActivityAction,
} from '../../redux/modules/editCreateActivity';
import {
  setDetail as setDetailAction,
} from '../../redux/modules/detail';
import styles from './styles';

const background = require('../../assets/gamescom.jpg');


@connect(
  state => ({
    event: state.events.currentEvent,
  }),
  {
    setTrip: setTripAction,
    setAccommodation: setAccommodationAction,
    setActivity: setActivityAction,
    resetTrip: resetTripAction,
    resetAccommodation: resetAccommodationAction,
    resetActivity: resetActivityAction,
    setDetail: setDetailAction,
  },
)
export default class Event extends Component {
  static propTypes = {
    event: PropTypes.shape({
      members: PropTypes.array.isRequired,
      trips: PropTypes.array.isRequired,
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
    } = this.props;
    const {
      name,
      // isPublic,
      // startAt,
      accommodations,
      trips,
      // members,
      type,
      id,
    } = this.props.event;

    const hasSubItems = accommodations.length || trips.length;
    const isEvent = type === 'event';

    const getMiddleBoxStyles = () => (isEvent ? styles.box : [styles.box, styles.lastBox]);

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.bgImage}
            source={background}
          >
            <View style={styles.header}>
              <Text style={styles.title}>
                {name}
              </Text>
            </View>
          </Image>
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
                <Text style={styles.boxText}>Share</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={getMiddleBoxStyles()}
                onPress={share({
                  message: `Join me with ${name}`,
                  url: `sameto://events/${id}`,
                  title: `Same.to: ${name}`
                })}
              >
                <Text style={styles.boxText}>Invite</Text>
              </TouchableHighlight>
              {isEvent && (
                <TouchableHighlight style={[styles.box, styles.lastBox]}>
                  <Text style={styles.boxText}>Participants</Text>
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
              setTrip={setTrip}
              setAccommodation={setAccommodation}
              setActivity={setActivity}
              setDetail={setDetail}
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                Bisher wurden keine Trips, Unterkünfte oder Aktivitäten angelegt.
                Um zu starten, drücke unten auf das Plus.
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

