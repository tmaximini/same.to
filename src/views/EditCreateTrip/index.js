import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { formatDate } from '../../utils';
import Form from '../../layouts/form';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import { actions as tripActions } from '../../redux/modules/editCreateTrip';


@connect(
  state => state.editCreateTrip,
  tripActions,
)
export default class EditCreateTrip extends Component {

  static propTypes = {
    updateTrip: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    setTrip: PropTypes.func.isRequired,
    updateRemoteTrip: PropTypes.func.isRequired,
    createTrip: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    geocodeDestination: PropTypes.func.isRequired,
    tripTypes: PropTypes.array,
    pickupString: PropTypes.string,
    destinationString: PropTypes.string,
    trip: PropTypes.object,
    eventId: PropTypes.string,
    isNew: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (this.props.isNew) {
      this.props.createTrip(item, this.props.eventId);
    } else {
      this.props.updateRemoteTrip(item);
    }
  }

  render() {
    const {
      tripTypes,
      updateTrip,
      toggleCategory,
      geocodeLocation,
      geocodeDestination,
      pickupString,
      destinationString,
      trip,
    } = this.props;

    const today = formatDate(new Date());

    return (
      <Form
        buttonText={this.props.isNew ? 'Save' : 'Update'}
        onSubmit={() => this.saveItem(trip)}
      >
        <CheckboxList
          label="Mit folgenden Transportmitteln würde ich reisen"
          items={tripTypes}
          model={trip}
          onChange={toggleCategory}
        />
        <Datepicker
          placeholder="Start Date"
          minDate={today}
          date={trip.startAt}
          onChange={date => updateTrip('startAt', date)}
          grow={false}
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
      </Form>
    );
  }
}



