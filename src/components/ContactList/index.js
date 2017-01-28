import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import ContactListItem from './ContactListItem';
import styles from './styles';
import { COLORS } from '../../constants';
// import { border } from '../../utils';

export default class ContactList extends Component {

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func.isRequired,
    setCurrentContact: PropTypes.func,
    isRefreshing: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    console.log('props', props);
    const { contacts } = props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows(contacts),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts) {
      console.info('nextProps ContactS', nextProps.contacts);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.contacts)
      });
    }
  }

  onRefresh() {
    console.info('on refresh called!');
    this.props.refresh();
  }

  render() {
    const { setCurrentContact } = this.props;

    return (
      <ListView
        enableEmptySections
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={contact => <ContactListItem contact={contact} setCurrentContact={setCurrentContact} />}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor={COLORS.CYAN}
            title="Refreshing..."
            titleColor={COLORS.WHITE}
            progressBackgroundColor={COLORS.CYAN}
          />
        }
      />
    );
  }
}
