import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { formatDate } from '../../utils';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import Select from '../../components/Select';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
import { actions as accommodationActions } from '../../redux/modules/editCreateAccommodation';

import styles from './styles';

// TODO: i18n
const overstays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({ value: i, label: `${i} night(s)` }));

@connect(
  state => state.editCreateAccommodation,
  accommodationActions,
)
export default class EditCreateAccommodation extends Component {

  static propTypes = {
    updateAccommodation: PropTypes.func.isRequired,
    setAccommodation: PropTypes.func.isRequired,
    updateRemoteAccommodation: PropTypes.func.isRequired,
    createAccommodation: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    accommodationTypes: PropTypes.array,
    locationString: PropTypes.string,
    accommodation: PropTypes.object,
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
      this.props.createAccommodation(item, this.props.eventId);
    } else {
      this.props.updateRemoteAccommodation(item);
    }
  }

  render() {
    const {
      accommodationTypes,
      updateAccommodation,
      geocodeLocation,
      toggleCategory,
      locationString,
      accommodation,
    } = this.props;

    const { overnightStays, location } = accommodation;

    const today = formatDate(new Date());

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.checkboxWrapper}>
            <Text style={styles.checkboxLabel}>
              Accommodation Types
            </Text>
            <CheckboxList
              items={accommodationTypes}
              onChange={toggleCategory}
              model={accommodation}
            />
          </View>
          <Input
            placeholder="Name"
            onChangeText={text => updateAccommodation('name', text)}
            icon="bed"
            value={accommodation.name}
          />
          <GeoInput
            placeholder="Where"
            enablePoweredByContainer={false}
            value={locationString || location.locality}
            onChangeText={text => updateAccommodation('locationString', text)}
            onAdressSelect={geocodeLocation}
          />
          <View style={styles.inputGroup}>
            <Datepicker
              placeholder="Start Date"
              minDate={today}
              date={accommodation.startAt || today}
              onChange={date => updateAccommodation('startAt', date)}
            />
            <View style={styles.spacer}></View>
            <Select
              placeholder="Dauer"
              value={overnightStays}
              items={overstays}
              onChange={val => updateAccommodation('overnightStays', val)}
            />
          </View>
          <HR />
          <OnOffSwitch
            name="Make this accommodation public"
            value={accommodation.isPublic}
            onChange={(val) => updateAccommodation('isPublic', val)}
          />
          <View style={styles.button}>
            <Button
              text={this.props.isNew ? 'Save' : 'Update'}
              onPress={() => this.saveItem(accommodation)}
            />
          </View>
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}



