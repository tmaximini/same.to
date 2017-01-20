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
import { actions as accommodationActions } from '../../redux/modules/editCreateAccommodation';

import styles from './styles';

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
    toggleType: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    model: PropTypes.object,
    accommodationTypes: PropTypes.array,
    locationString: PropTypes.string,
    accommodation: PropTypes.object,
    eventId: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.isNew = true;
    this.saveItem = this.saveItem.bind(this);
  }

  componentWillMount() {
    const { setAccommodation, model } = this.props;
    // 'model' is passed when we edit a accommodation, so we set
    // editMethod and inital values correctly
    if (model) {
      this.isNew = false;
      setAccommodation(model);
    }
  }

  saveItem(item) {
    if (this.isNew) {
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
      toggleType,
      locationString,
      accommodation,
    } = this.props;

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
              onChange={toggleType}
              model={accommodation}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Name"
              onChangeText={text => updateAccommodation('name', text)}
              icon="bed"
              value={accommodation.name}
            />
            <Datepicker
              placeholder="Start Date"
              minDate={today}
              date={accommodation.startAt || today}
              onChange={date => updateAccommodation('startAt', date)}
            />
            <GeoInput
              placeholder="Where"
              enablePoweredByContainer={false}
              value={locationString}
              onChangeText={text => updateAccommodation('locationString', text)}
              onAdressSelect={geocodeLocation}
            />
          </View>
          <View style={styles.button}>
            <Button
              text={this.isNew ? 'Save' : 'Update'}
              onPress={() => this.saveItem(accommodation)}
            />
          </View>
        </View>
      </View>
    );
  }
}



