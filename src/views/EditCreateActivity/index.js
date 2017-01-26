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
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
import { actions as activityActions } from '../../redux/modules/editCreateActivity';

import styles from './styles';


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
    toggleType: PropTypes.func.isRequired,
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
      toggleType,
      locationString,
      activity,
    } = this.props;

    const today = formatDate(new Date());

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.checkboxWrapper}>
            <Text style={styles.checkboxLabel}>
              Activity Types
            </Text>
            <CheckboxList
              items={activityTypes}
              onChange={toggleType}
              model={activity}
            />
          </View>
          <Input
            placeholder="Name"
            onChangeText={text => updateActivity('name', text)}
            icon="bed"
            value={activity.name}
          />
          <View style={styles.inputGroup}>
            <Datepicker
              placeholder="Start Date"
              minDate={today}
              date={activity.startAt || today}
              onChange={date => updateActivity('startAt', date)}
            />
            <View style={styles.spacer}></View>
            <GeoInput
              placeholder="Where"
              enablePoweredByContainer={false}
              value={locationString}
              onChangeText={text => updateActivity('locationString', text)}
              onAdressSelect={geocodeLocation}
            />
          </View>
          <HR />
          <OnOffSwitch
            name="Make this activity public"
            value={activity.isPublic}
            onChange={(val) => updateActivity('isPublic', val)}
          />
          <View style={styles.button}>
            <Button
              text={this.props.isNew ? 'Save' : 'Update'}
              onPress={() => this.saveItem(activity)}
            />
          </View>
        </View>
      </View>
    );
  }
}



