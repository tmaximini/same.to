import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';

import { actions as editCreateEventActions } from '../../redux/modules/editCreateEvent';
import { formatDate } from '../../utils';
import styles from './styles';


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
    isNew: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (this.props.isNew) {
      this.props.createEvent(item);
    } else {
      this.props.updateRemoteEvent(item);
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
      <View style={styles.container}>
        <View style={styles.form}>
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
            zIndex={99}
          />
          <View style={[styles.inputGroup, { zIndex: 1, elevation: 0 }]}>
            <Datepicker
              placeholder="Start Date"
              minDate={today}
              date={startAt}
              onChange={(date) => updateEvent('startAt', date)}
            />
            <View style={styles.spacer}></View>
            <Datepicker
              placeholder="End Date"
              date={endAt}
              minDate={startAt || today}
              onChange={(date) => updateEvent('endAt', date)}
            />
          </View>
        </View>
        <HR />
        <OnOffSwitch
          name="Make this event public"
          value={event.isPublic}
          onChange={(val) => updateEvent('isPublic', val)}
        />
        <View style={styles.button}>
          <Button
            text={this.props.isNew ? 'Save' : 'Update'}
            onPress={() => this.saveItem(event)}
          />
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

