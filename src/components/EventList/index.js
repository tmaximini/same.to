import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import EventListItem from './EventListItem';
import styles from './styles';
import { border } from '../../utils';

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
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(event) => <EventListItem {...event} />}
      />
    );
  }
}

export default EventList;
