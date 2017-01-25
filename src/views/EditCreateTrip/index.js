import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { formatDate } from '../../utils';
import OnOffSwitch from '../../components/OnOffSwitch';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import HR from '../../components/HR';
import { actions as tripActions } from '../../redux/modules/editCreateTrip';

import styles from './styles';

@connect(
  state => state.editCreateTrip,
  tripActions,
)
export default class EditCreateTrip extends Component {

  static propTypes = {
    updateTrip: PropTypes.func.isRequired,
    toggleType: PropTypes.func.isRequired,
    setTrip: PropTypes.func.isRequired,
    updateRemoteTrip: PropTypes.func.isRequired,
    createTrip: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    geocodeDestination: PropTypes.func.isRequired,
    model: PropTypes.object,
    tripTypes: PropTypes.array,
    pickupString: PropTypes.string,
    destinationString: PropTypes.string,
    trip: PropTypes.object,
    eventId: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.isNew = true;
    this.saveItem = this.saveItem.bind(this);
  }

  componentWillMount() {
    const { setTrip, model } = this.props;
    // 'model' is passed when we edit a trip, so we set
    // editMethod and inital values correctly
    if (model) {
      this.isNew = false;
      setTrip(model);
    }
  }

  saveItem(item) {
    if (this.isNew) {
      this.props.createTrip(item, this.props.eventId);
    } else {
      this.props.updateRemoteTrip(item);
    }
  }

  render() {
    const {
      tripTypes,
      updateTrip,
      toggleType,
      geocodeLocation,
      geocodeDestination,
      pickupString,
      destinationString,
      trip,
    } = this.props;

    console.log('pickupString', pickupString);

    const today = formatDate(new Date());

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.checkboxWrapper}>
            <Text style={styles.checkboxLabel}>
              Mit folgenden Transportmitteln würde ich reisen
            </Text>
            <CheckboxList
              items={tripTypes}
              model={trip}
              onChange={toggleType}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Datepicker
              placeholder="Start Date"
              minDate={today}
              date={trip.startDate}
              onChange={date => updateTrip('startDate', date)}
            />
            <GeoInput
              placeholder="Start"
              enablePoweredByContainer={false}
              value={pickupString}
              onChangeText={text => updateTrip('pickupString', text)}
              onAdressSelect={geocodeLocation}
              zIndex={2}
            />
            <GeoInput
              placeholder="Destination"
              enablePoweredByContainer={false}
              value={destinationString}
              onChangeText={text => updateTrip('destinationString', text)}
              onAdressSelect={geocodeDestination}
              zIndex={1}
            />
            <HR />
            <OnOffSwitch
              name="Make this trip public"
              value={trip.isPublic}
              onChange={(val) => updateTrip('isPublic', val)}
            />
          </View>
          <View style={styles.spacer}>

          </View>
          <View style={styles.button}>
            <Button
              text={this.isNew ? 'Save' : 'Update'}
              onPress={() => this.saveItem(trip)}
            />
          </View>
        </View>
      </View>
    );
  }
}



