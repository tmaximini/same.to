import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { formatDate } from '../../utils';
import Form from '../../layouts/form';
import InputGroup from '../../components/InputGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
import { actions as activityActions } from '../../redux/modules/editCreateActivity';


@connect(
  state => state.editCreateActivity,
  activityActions,
)
export default class EditCreateActivity extends Component {

  static propTypes = {
    updateActivity: PropTypes.func.isRequired,
    setActivity: PropTypes.func.isRequired,
    updateRemoteActivity: PropTypes.func.isRequired,
    createActivity: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    activityTypes: PropTypes.array,
    locationString: PropTypes.string,
    activity: PropTypes.object,
    eventId: PropTypes.string,
    isNew: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (this.props.isNew) {
      console.log('eventId', this.props.eventId);
      this.props.createActivity(item, this.props.eventId);
    } else {
      this.props.updateRemoteActivity(item);
    }
  }

  render() {
    const {
      activityTypes,
      updateActivity,
      geocodeLocation,
      toggleCategory,
      locationString,
      activity,
    } = this.props;

    const today = formatDate(new Date());

    return (
      <Form
        buttonText={this.props.isNew ? 'Save' : 'Update'}
        onSubmit={() => this.saveItem(activity)}
      >
        <CheckboxList
          label="Activity Types"
          items={activityTypes}
          onChange={toggleCategory}
          model={activity}
        />
        <Input
          placeholder="Name"
          onChangeText={text => updateActivity('name', text)}
          icon="bed"
          value={activity.name}
        />
        <InputGroup>
          <Datepicker
            placeholder="Start Date"
            minDate={today}
            date={activity.startAt || today}
            onChange={date => updateActivity('startAt', date)}
          />
          <GeoInput
            placeholder="Where"
            enablePoweredByContainer={false}
            value={locationString}
            onChangeText={text => updateActivity('locationString', text)}
            onAdressSelect={geocodeLocation}
            zIndex={99}
            grow
          />
        </InputGroup>
        <HR />
        <OnOffSwitch
          name="Make this activity public"
          value={activity.isPublic}
          onChange={(val) => updateActivity('isPublic', val)}
        />
      </Form>
    );
  }
}



