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
    } = event;

    const today = formatDate(new Date());

    return (
      <Form
        buttonText={event.id ? I18n.t('save') : I18n.t('create')}
        onSubmit={() => this.saveItem(event)}
      >
        <Input
          placeholder="Event name"
          onChangeText={text => updateEvent('name', text)}
          value={name}
        />
        <GeoInput
          placeholder="Where?"
          enablePoweredByContainer={false}
          value={locationString}
          onChangeText={(text) => updateEvent('locationString', text)}
          onAdressSelect={geocodeLocation}
          zIndex={100}
        />
        <InputGroup>
          <Datepicker
            placeholder="Start Date"
            minDate={today}
            date={startAt}
            onChange={(date) => updateEvent('startAt', date)}
          />
          <Datepicker
            placeholder="End Date"
            date={endAt}
            minDate={startAt || today}
            onChange={(date) => updateEvent('endAt', date)}
          />
        </InputGroup>
        <HR />
        <OnOffSwitch
          name="Make this event public"
          value={event.isPublic}
          onChange={(val) => updateEvent('isPublic', val)}
        />
      </Form>
    );
  }
}

