import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { WithPadding } from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Datepicker from '../../components/Datepicker';
import { actions as eventActions } from '../../redux/modules/events';
import { formatDate } from '../../utils';
import styles from './styles';

@connect(
  state => ({
    newEvent: state.events.newEvent
  }),
  eventActions,
)
export default class NewEvent extends Component {

  static propTypes = {
    newEvent: PropTypes.object,
    updateNewEvent: PropTypes.func.isRequired,
  }

  render() {
    const {
      updateNewEvent,
      newEvent,
    } = this.props;

    const {
      name,
      location,
      startsAt,
      endsAt
    } = newEvent;

    const today = formatDate(new Date());

    return (
      <View>
        <WithPadding>
          <Input
            placeholder="Event Name"
            value={name}
            onChangeText={(text) => updateNewEvent('name', text)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChangeText={(text) => updateNewEvent('location', text)}
          />
          <Datepicker
            placeholder="Start Date"
            minDate={today}
            date={startsAt || today}
            onChange={(date) => updateNewEvent('startsAt', date)}
          />
          <Datepicker
            placeholder="End Date"
            date={endsAt || today}
            minDate={startsAt || today}
            onChange={(date) => updateNewEvent('endsAt', date)}
          />
        </WithPadding>
      </View>
    );
  }
}

