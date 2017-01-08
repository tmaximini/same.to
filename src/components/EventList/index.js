import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import EventListItem from './EventListItem';
import styles from './styles';
// import { border } from '../../utils';

class EventList extends Component {

  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    const { events } = props;
    console.info('EVENTS', events);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows(events),
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('received props', nextProps);
    if (true) {
      console.info('nextProps EVENTS', nextProps.events);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.events)
      });
    }
  }

  onRefresh() {
    console.info('on refresh called!');
    this.props.refresh();
  }

  render() {
    return (
      <ListView
        enableEmptySections
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={event => <EventListItem event={event} />}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />
    );
  }
}

export default EventList;
