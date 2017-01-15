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
    action: () => { console.log('click'); Actions.editCreateTrip(); },
    icon: 'ios-cafe-outline'
  },
  {
    title: 'accomodation',
    action: () => { console.log('click'); Actions.editCreateAccommodation(); },
    icon: 'ios-bulb-outline'
  },
  {
    title: 'activity',
    action: () => { console.log('click'); Actions.editCreateTrip(); },
    icon: 'ios-bulb-outline'
  }
];

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.shape({
      members: PropTypes.array.isRequired,
      trips: PropTypes.array.isRequired,
      accommodations: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.editAccommodation = this.editAccommodation.bind(this);
    this.editTrip = this.editTrip.bind(this);
  }

  editAccommodation() {
    console.log('editAccommodation');
    Actions.editAccommodation({ event: this.props.event });
  }

  editTrip() {
    console.log('editTrip');
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
                <Text style={styles.boxText}>Invites</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>Members</Text>
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
            <Text>has no items</Text>
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
