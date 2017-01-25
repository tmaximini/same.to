import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';

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
    eventTypes: PropTypes.arrayOf(PropTypes.string),
    updateEvent: PropTypes.func.isRequired,
    updateRemoteEvent: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    setEvent: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    locationString: PropTypes.string,
    model: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.isNew = true;
    this.saveItem = this.saveItem.bind(this);
  }

  componentWillMount() {
    const { setEvent, model } = this.props;
    // 'model' is passed when we edit a trip, so we set
    // editMethod and inital values correctly
    if (model) {
      this.isNew = false;
      setEvent(model);
    }
  }

  saveItem(item) {
    if (this.isNew) {
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
          />
          <View style={styles.inputGroup}>
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
        <View style={styles.button}>
          <Button
            text={this.isNew ? 'Save' : 'Update'}
            onPress={() => this.saveItem(event)}
          />
        </View>
      </View>
    );
  }
}

