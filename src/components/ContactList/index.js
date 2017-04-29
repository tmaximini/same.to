import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import ContactListItem from '../ContactCheckList/ContactCheckListItem';
import styles from './styles';
import { COLORS } from '../../constants';
import { getUserId } from '../../services/api';

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
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // this.onRefresh = this.onRefresh.bind(this);
  }

  // onRefresh = () => {
  //   this.props.refresh();
  // }

  renderContactListItem = contact => {
    const { setCurrentContact, ...rest } = this.props;

    return (<ContactListItem
      {...rest}
      contact={contact}
      setCurrentContact={setCurrentContact}
    />);
  }

  render = () => {
    const { refresh, style, } = this.props;

    const dataSource = this.dataSource.cloneWithRows(this.props.contacts);

    return (
      <ListView
        enableEmptySections
        automaticallyAdjustContentInsets={false}
        style={[styles.container, style]}
        dataSource={dataSource}
        renderRow={this.renderContactListItem}
        refreshControl={
          refresh ? (
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={this.props.refresh}
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
