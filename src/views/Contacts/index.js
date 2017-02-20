import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
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
  state => ({
    ...state.contacts,
    ...state.editCreateProfile
  }),
  contactActions,
)
export default class Contacts extends Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    contactSearchResults: PropTypes.arrayOf(PropTypes.object),
    fetchContacts: PropTypes.func.isRequired,
    searchContacts: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool,
    isSearching: PropTypes.bool,
  };

  state = {
    searchMode: false
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
      isSearching,
      ...rest,
    } = this.props;
    const { searchMode } = this.state;
    const members = searchMode ? contactSearchResults : contacts;

    return (
      <View style={styles.container}>
        <Search
          onCancel={() => this.setState({ searchMode: false })}
          onSearch={text => {
            this.setState({ searchMode: true });
            searchContacts(text);
          }}
        />
        <Form
          buttonText={I18n.t('invite_friends')}
          onSubmit={share({
            message: 'Join me on same.to',
            url: 'sameto://invite/url/to/be/defined',
            title: 'Invite friend'
          })}
          buttonProps={{ noResize: true }}
        >
          {members && members.length > 0 ? (
            <ContactList
              noIcons
              contacts={members}
              refresh={fetchContacts}
              isRefreshing={isRefreshing}
              {...rest}
            />
          ) : (
            <View style={styles.noItems}>
              {searchMode ? (
                <Text style={styles.noItemsText}>
                  {isSearching ? I18n.t('searching') : I18n.t('no_search_result')}
                </Text>
              ) : (
                <Text style={styles.noItemsText}>
                  {I18n.t('no_contacts_yet')}
                </Text>
              )}
            </View>
          )}
        </Form>
      </View>
    );
  }
}
