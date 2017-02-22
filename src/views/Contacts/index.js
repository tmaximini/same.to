import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import {
  View,
  Text,
  NetInfo,
} from 'react-native';
import { connect } from 'react-redux';
import Search from '../../components/Search';
import ContactList from '../../components/ContactList';
import Button from '../../components/Button';
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

  constructor() {
    super();
    this.state = {
      searchMode: false
    };
    this.onConnectivityChange = this.onConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.fetchContacts();
      }
    });
    NetInfo.isConnected.addEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  onConnectivityChange(connected) {
    if (connected) {
      this.props.fetchContacts();
    }
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
        <View
          style={styles.wrapper}
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
        </View>
        <Button
          text={I18n.t('invite_friends')}
          onPress={share({
            message: 'Join me on same.to',
            url: 'sameto://invite/url/to/be/defined',
            title: 'Invite friend'
          })}
          style={{ marginHorizontal: 12 }}
          noResize
        />
      </View>
    );
  }
}
