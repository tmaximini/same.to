import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { formatDate } from '../../utils';
import SubItemList from '../../components/Event/SubItemList';
import PlusButton from '../../components/PlusButton';
import styles from './styles';

const background = require('../../assets/gamescom.jpg');

const buttonItems = [
  {
    title: 'trip',
    action: () => { Actions.editCreateTrip(); },
    icon: 'car'
  },
  {
    title: 'accomodation',
    action: () => { Actions.editCreateAccommodation(); },
    icon: 'bed'
  },
  {
    title: 'activity',
    action: () => { Actions.editCreateTrip(); },
    icon: 'coffee'
  }
];

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.shape({
      members: PropTypes.array.isRequired,
      trips: PropTypes.array.isRequired,
      accommodations: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
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
      name,
      type,
      description,
      isPublic,
      startAt,
      accommodations,
      trips,
      members,
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
                <TouchableHighlight>
                  <Text style={styles.boxText}>Share</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>Invite</Text>
              </View>
              <View style={[styles.box, { borderRightWidth: 0 }]}>
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
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                Bisher wurden keine Trips, Unterkünfte oder Aktivitäten angelegt. Um zu starten, drücke unten auf das Plus.
              </Text>
            </View>
          )}

          <PlusButton
            itemSize={45}
            radius={80}
            startDegree={225}
            endDegree={315}
            items={buttonItems}
          />
        </View>
      </View>
    );
  }
}

