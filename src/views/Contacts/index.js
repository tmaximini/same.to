import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ContactList from '../../components/ContactList';
// import PlusButton from '../../components/PlusButton';

import { actions as contactActions } from '../../redux/modules/contacts';
// import { resetEvent as resetEventAction } from '../../redux/modules/editCreateEvent';
// import { resetActivity as resetActivityAction } from '../../redux/modules/editCreateActivity';
import styles from './styles';

@connect(
  state => state.contacts,
  contactActions,
)
export default class Contacts extends Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    fetchContacts: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool,
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const {
      contacts,
      fetchContacts,
      isRefreshing,
    } = this.props;

    return (
      <View style={styles.container}>
        <ContactList
          contacts={contacts}
          refresh={fetchContacts}
          isRefreshing={isRefreshing}
        />
      </View>
    );
  }
}
