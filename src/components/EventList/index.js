import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';

import EventListItem from './EventListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

class EventList extends Component {

  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props) {
    super(props);
    const { events } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(events),
    };
  }


  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(event) => <EventListItem {...event} />}
      />
    );
  }
}

export default EventList;
