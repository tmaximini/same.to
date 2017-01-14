import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import CheckboxList from '../../components/CheckboxList';
import { actions as tripActions } from '../../redux/modules/editCreateTrip';

import styles from './styles';

@connect(
  state => state.editCreateTrip,
  tripActions,
)
export default class EditCreateTrip extends Component {

  static propTypes = {
    updateTrip: PropTypes.func.isRequired,
    setTrip: PropTypes.func.isRequired,
    updateRemoteTrip: PropTypes.func.isRequired,
    createTrip: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    model: PropTypes.object,
    tripTypes: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.isNew = true;
    this.saveItem = this.saveItem.bind(this);
  }

  componentWillMount() {
    const { setTrip, model } = this.props;
    // 'model' is passed when we edit a trip, so we set
    // editMethod and inital values correctly
    if (model) {
      this.isNew = false;
      setTrip(model);
    }
  }

  saveItem(item) {
    if (this.isNew) {
      this.props.createTrip(item);
    } else {
      this.props.updateRemoteTrip(item);
    }
  }


  render() {
    const { tripTypes, updateTrip } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.checkboxWrapper}>
            <Text style={styles.checkboxLabel}>
              Mit folgenden Transportmitteln würde ich reisen
            </Text>
            <CheckboxList
              items={tripTypes}
              onChange={updateTrip}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>test</Text>
          </View>
        </View>
      </View>
    );
  }
}



