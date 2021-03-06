import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import EventListItem from './EventListItem';
import { COLORS, MIXINS } from '../../constants';

export default class EventList extends Component {

  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    archive: PropTypes.bool,
  }

  static defaultProps = {
    archive: false,
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
    return (
      <ListView
        enableEmptySections
        style={MIXINS.container}
        dataSource={this.state.dataSource}
        alwaysBounceHorizontal={false}
        automaticallyAdjustContentInsets={false}
        initialListSize={5}
        pageSize={5}
        renderRow={event => <EventListItem
          event={event}
          isArchive={this.props.archive}
          {...this.props}
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
