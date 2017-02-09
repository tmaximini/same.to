import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import EventListItem from './EventListItem';
import styles from './styles';
import { COLORS } from '../../constants';
// import { border } from '../../utils';

export default class EventList extends Component {

  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func.isRequired,
    setCurrentEvent: PropTypes.func.isRequired,
    setEvent: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    const { events } = props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows(events),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.events)
      });
    }
  }

  onRefresh() {
    this.props.refresh();
  }

  render() {
    const { setCurrentEvent, setEvent } = this.props;

    return (
      <ListView
        enableEmptySections
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={event => <EventListItem
          event={event}
          setCurrentEvent={setCurrentEvent}
          setEvent={setEvent}
        />}
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
