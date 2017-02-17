import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import Search from '../../components/Search';
import ContactList from '../../components/ContactList';
import Form from '../../layouts/form';
import { share } from '../../utils';

import { actions as contactActions } from '../../redux/modules/contacts';
import styles from './styles';

@connect(
  state => state.contacts,
  contactActions,
)
export default class Contacts extends Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    contactSearchResults: PropTypes.arrayOf(PropTypes.object),
    fetchContacts: PropTypes.func.isRequired,
    searchContacts: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool,
  };

  state = {
    searching: false
  };

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const {
      contacts,
      contactSearchResults,
      fetchContacts,
      isRefreshing,
      searchContacts,
      ...rest,
    } = this.props;
    const { searching } = this.state;
    const members = searching ? contactSearchResults : contacts;

    return (
      <View style={styles.container}>
        <Search
          onCancel={() => this.setState({ searching: false })}
          onSearch={text => {
            this.setState({ searching: true });
            searchContacts(text);
          }}
        />
        <Form
          buttonText="Freunde einladen"
          onSubmit={share({
            message: 'Join me on same.to',
            url: 'sameto://invite/url/to/be/defined',
            title: 'Invite friend'
          })}
        >
          {members && members.length > 0 ? (
            <ContactList
              contacts={members}
              refresh={fetchContacts}
              isRefreshing={isRefreshing}
              {...rest}
            />
          ) : (
            <View style={styles.noItems}>
              {searching ? (
                <Text style={styles.noItemsText}>
                  Keine Ergebnisse zu dieser Suche.
                </Text>
              ) : (
                <Text style={styles.noItemsText}>
                  Du hast derzeit noch keine Kontakte. Füge deinen ersten Kontakt hinzu oder lade Freunde zur App ein.
                </Text>
              )}
            </View>
          )}
        </Form>
      </View>
    );
  }
}
