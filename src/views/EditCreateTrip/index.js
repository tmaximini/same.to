import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import Form from '../../layouts/form';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
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
  }

  constructor(props) {
    super(props);
    this.state = {
      geoFocusFrom: false,
      geoFocusTo: false,
    };
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (item.id) {
      this.props.updateRemoteTrip(item);
    } else {
      this.props.createTrip(item, this.props.eventId);
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

    const today = new Date();

    const {
      pickupLocation, destinationLocation
    } = trip;

    const isValid = () => (
      trip.startAt &&
      pickupLocation &&
      destinationLocation &&
      pickupLocation.locality &&
      destinationLocation.locality
    );

    return (
      <Form
        buttonText={trip.id ? I18n.t('save') : I18n.t('create')}
        onSubmit={() => this.saveItem(trip)}
        buttonDisabled={!isValid()}
      >
        <CheckboxList
          label={I18n.t('i_would_travel')}
          items={tripTypes}
          model={trip}
          onChange={toggleCategory}
        />
        <Datepicker
          placeholder={`${I18n.t('start')} ${I18n.t('date')}`}
          minDate={today}
          date={trip.startAt}
          onChange={date => updateTrip('startAt', date)}
          grow={false}
        />
        <GeoInput
          focus={this.state.geoFocusFrom}
          onFocus={() => this.setState({ geoFocusFrom: true })}
          onBlur={() => this.setState({ geoFocusFrom: false })}
          placeholder={I18n.t('from')}
          enablePoweredByContainer={false}
          value={pickupString}
          onChangeText={text => updateTrip('pickupString', text)}
          onAdressSelect={geocodeLocation}
          zIndex={2}
        />
        <GeoInput
          focus={this.state.geoFocusTo}
          onFocus={() => this.setState({ geoFocusTo: true })}
          onBlur={() => this.setState({ geoFocusTo: false })}
          placeholder={I18n.t('to')}
          enablePoweredByContainer={false}
          value={destinationString}
          onChangeText={text => updateTrip('destinationString', text)}
          onAdressSelect={geocodeDestination}
          zIndex={1}
        />
        <HR />
        <OnOffSwitch
          name={I18n.t('make_trip_public')}
          value={trip.isPublic}
          onChange={(val) => updateTrip('isPublic', val)}
          style={{ marginBottom: 12 }}
        />
      </Form>
    );
  }
}



