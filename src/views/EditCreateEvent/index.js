import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import Form from '../../layouts/form';
import InputGroup from '../../components/InputGroup';
import Input from '../../components/Input';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';

import { actions as editCreateEventActions } from '../../redux/modules/editCreateEvent';
import { formatDate } from '../../utils';


@connect(
  state => state.editCreateEvent,
  editCreateEventActions,
)
export default class EditCreatevent extends Component {

  static propTypes = {
    event: PropTypes.object,
    updateEvent: PropTypes.func.isRequired,
    updateRemoteEvent: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    setEvent: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    locationString: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      geoFocus: false,
    };
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (item.id) {
      this.props.updateRemoteEvent(item);
    } else {
      this.props.createEvent(item);
    }
  }

  render() {
    const {
      updateEvent,
      event,
      geocodeLocation,
      locationString,
    } = this.props;

    const {
      name,
      startAt,
      endAt,
      location,
    } = event;

    const today = formatDate(new Date());

    return (
      <Form
        buttonText={event.id ? I18n.t('save') : I18n.t('create')}
        onSubmit={() => this.saveItem(event)}
        buttonDisabled={!startAt || !name || !location.locality}
      >
        <Input
          placeholder={I18n.t('name')}
          onChangeText={text => updateEvent('name', text)}
          value={name}
        />
        <GeoInput
          focus={this.state.geoFocus}
          onFocus={() => this.setState({ geoFocus: true })}
          onBlur={() => this.setState({ geoFocus: false })}
          placeholder={I18n.t('location')}
          enablePoweredByContainer={false}
          value={locationString}
          onChangeText={(text) => updateEvent('locationString', text)}
          onAdressSelect={geocodeLocation}
          zIndex={100}
        />
        <InputGroup>
          <Datepicker
            placeholder={I18n.t('start')}
            minDate={today}
            date={startAt}
            onChange={(date) => updateEvent('startAt', date)}
          />
          <Datepicker
            placeholder={I18n.t('end')}
            date={endAt}
            minDate={startAt || today}
            onChange={(date) => updateEvent('endAt', date)}
          />
        </InputGroup>
        <HR />
        <OnOffSwitch
          name={I18n.t('make_event_public')}
          value={event.isPublic}
          onChange={(val) => updateEvent('isPublic', val)}
          style={{ marginBottom: 12 }}
        />
      </Form>
    );
  }
}

