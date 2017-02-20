import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import ContactListItem from '../ContactCheckList/ContactCheckListItem';
import styles from './styles';
import { COLORS } from '../../constants';
// import { border } from '../../utils';

export default class ContactList extends Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func,
    setCurrentContact: PropTypes.func,
    isRefreshing: PropTypes.bool,
    style: PropTypes.object,
    noIcons: PropTypes.bool,
    profile: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const { contacts } = props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows(contacts),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts || nextProps.profile) {
      const contacts = nextProps.contacts.map(c => ({
        ...c,
        contactsLength: nextProps.profile.contactIds.length,
        favoritesLength: nextProps.profile.favoriteIds.length,
      }));
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(contacts),
      });
    }
  }

  onRefresh() {
    this.props.refresh();
  }

  render() {
    const { setCurrentContact, refresh, style, profile, ...rest } = this.props;

    return (
      <ListView
        enableEmptySections
        automaticallyAdjustContentInsets={false}
        style={[styles.container, style]}
        dataSource={this.state.dataSource}
        renderRow={contact => (
          <ContactListItem
            contact={contact}
            setCurrentContact={setCurrentContact}
            isContact={profile.contactIds.includes(contact.id)}
            isFavorite={profile.favoriteIds.includes(contact.id)}
            {...rest}
          />
        )}
        refreshControl={
          refresh ? (
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor={COLORS.CYAN}
              title="Refreshing..."
              titleColor={COLORS.WHITE}
              progressBackgroundColor={COLORS.CYAN}
            />
          ) : null
        }
      />
    );
  }
}

ContactList.defaultProps = {
  contacts: [],
  style: {},
  noIcons: false,
};
