import React, { Component, PropTypes } from 'react';
import { View, ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { formatDate } from '../../utils';
import SubItemList from '../../components/Event/SubItemList';
import PlusButton from '../../components/PlusButton';
import styles from './styles';


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
          <View style={styles.header}>
            <Text style={styles.title}>
              {name}
            </Text>
          </View>
          <View style={styles.details}>
            <View style={styles.buttons}>
              <View style={styles.box}>
                <Text>{type}</Text>
              </View>
              <View style={styles.box}><Text>Invites</Text></View>
              <View style={styles.box}><Text>Members</Text></View>
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
            items={[
              { title: 'trip', action: this.editTrip, icon: 'ios-cafe-outline' },
              { title: 'accomodation', action: this.editAccommodation, icon: 'ios-bulb-outline' },
              { title: 'activity', action: this.editTrip, icon: 'ios-bulb-outline' }
            ]}
          />
        </View>
      </View>
    );
  }
}

