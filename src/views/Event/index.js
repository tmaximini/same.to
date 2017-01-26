import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableHighlight, Share } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import { formatDate } from '../../utils';
import SubItemList from '../../components/Event/SubItemList';
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
import { COLORS } from '../../constants';
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
    }).isRequired,
    setTrip: PropTypes.func.isRequired,
    setAccommodation: PropTypes.func.isRequired,
    setActivity: PropTypes.func.isRequired,
    resetTrip: PropTypes.func.isRequired,
    resetActivity: PropTypes.func.isRequired,
    resetAccommodation: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.editAccommodation = this.editAccommodation.bind(this);
    this.editTrip = this.editTrip.bind(this);
    this.shareEvent = this.shareEvent.bind(this);
  }

  editAccommodation() {
    Actions.editAccommodation({ event: this.props.event });
  }

  editTrip() {
    Actions.editTrip({ event: this.props.event });
  }

  shareEvent() {
    Share.share({
      message: 'Yo, this event rocks',
      url: 'shareto://facebook.github.io/react-native/',
      title: `Same.to Event ${this.props.event.name}`
    }, {
      dialogTitle: `Same.to Event ${this.props.event.name}`,
      excludedActivityTypes: [],
      tintColor: COLORS.CYAN,
    })
    .then(result => console.log('shared successfully', result))
    .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const {
      setTrip,
      setAccommodation,
      setActivity,
      resetTrip,
      resetActivity,
      resetAccommodation,
    } = this.props;
    const {
      name,
      // isPublic,
      // startAt,
      accommodations,
      trips,
      // members,
      id,
    } = this.props.event;

    const hasSubItems = accommodations.length || trips.length;

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
              <View style={styles.box}>
                <TouchableHighlight
                  onPress={this.shareEvent}
                >
                  <Text style={styles.boxText}>Share</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>Invite</Text>
              </View>
              <View style={[styles.box, styles.lastBox]}>
                <Text style={styles.boxText}>Participants</Text>
              </View>
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
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                Bisher wurden keine Trips, Unterkünfte oder Aktivitäten angelegt.
                Um zu starten, drücke unten auf das Plus.
              </Text>
            </View>
          )}

          <PlusButton
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
        </View>
      </View>
    );
  }
}

