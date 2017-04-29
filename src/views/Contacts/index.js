import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import {
  View,
  Text,
  NetInfo,
} from 'react-native';
import _ from 'lodash';
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
    fetchContacts: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool,
    isSearching: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    console.log(props)

    const { contacts } = props;
    this.state = {
      searchMode: false,
      contactSearchResults: [],
      contacts
    };
    this.onConnectivityChange = this.onConnectivityChange.bind(this);
    this.filterResults = this.filterResults.bind(this);
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      contacts: nextProps.contacts,
    });
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

  filterResults(query) {
    const { contacts } = this.props;
    const q = query.toLowerCase();
    this.setState({
      searchMode: true,
      contacts: _.filter(contacts, item =>
        (item.firstName && item.firstName.toLowerCase().includes(q)) ||
        (item.lastName && item.lastName.toLowerCase().includes(q))
      )
    });
  }

  render() {
    const {
      fetchContacts,
      isRefreshing,
      isSearching,
      ...rest,
    } = this.props;
    const { searchMode, contacts } = this.state;

    return (
      <View style={styles.container}>
        {contacts.length > 0 && <Search
          onCancel={() => this.setState({
            searchMode: false,
            contacts: this.props.contacts,
          })}
          placeholder={I18n.t('filter_contacts')}
          onSearch={text => this.filterResults(text)}
          onChange={text => this.filterResults(text)}
        />}
        <View
          style={styles.wrapper}
        >
          {contacts && contacts.length > 0 ? (
            <ContactList
              {...rest}
              contacts={this.state.contacts}
              refresh={fetchContacts}
              isRefreshing={isRefreshing}
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
