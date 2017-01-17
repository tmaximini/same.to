import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { formatDate } from '../../utils';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import { actions as tripActions } from '../../redux/modules/editCreateTrip';

import styles from './styles';

@connect(
  state => state.editCreateTrip,
  tripActions,
)
export default class EditCreateTrip extends Component {

  static propTypes = {
    updateTrip: PropTypes.func.isRequired,
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
  }

  constructor(props) {
    super(props);
    this.isNew = true;
    this.saveItem = this.saveItem.bind(this);
    this.toggleDest = this.toggleDest.bind(this);
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
      this.props.createTrip(item);
    } else {
      this.props.updateRemoteTrip(item);
    }
  }


  render() {
    const {
      tripTypes,
      updateTrip,
      geocodeLocation,
      geocodeDestination,
      pickupString,
      destinationString,
      trip,
    } = this.props;
    const { hideDest } = this.state;

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
              onChange={updateTrip}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Standort"
              onChangeText={text => updateTrip('pickupString', text)}
              icon="ios-locate-outline"
            />
            <Datepicker
              placeholder="Start Date"
              minDate={today}
              date={trip.startAt || today}
              onChange={date => updateTrip('startAt', date)}
            />
            <GeoInput
              placeholder="Start"
              enablePoweredByContainer={false}
              value={pickupString}
              onChangeText={text => updateTrip('pickupString', text)}
              onAdressSelect={geocodeLocation}
            />
            <GeoInput
              placeholder="Destination"
              enablePoweredByContainer={false}
              value={destinationString}
              onChangeText={text => updateTrip('destinationString', text)}
              onAdressSelect={geocodeDestination}
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



