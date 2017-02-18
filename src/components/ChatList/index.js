import React, { Component, PropTypes } from 'react';
// import I18n from 'react-native-i18n';
import { ListView, RefreshControl } from 'react-native';

import ChatListItem from './ChatListItem';
import styles from './styles';
import { COLORS } from '../../constants';
// import { border } from '../../utils';

export default class ChatList extends Component {

  static propTypes = {
    chats: PropTypes.arrayOf(PropTypes.object),
    refresh: PropTypes.func.isRequired,
    setCurrentChat: PropTypes.func.isRequired,
    showActionSheetWithOptions: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    const { chats } = props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows(chats),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chats) {
      // console.info('nextProps Chats', nextProps.chats);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.chats)
      });
    }
  }

  onRefresh() {
    this.props.refresh();
  }

  render() {
    const { setCurrentChat, showActionSheetWithOptions } = this.props;

    return (
      <ListView
        enableEmptySections
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={chat => <ChatListItem
          chat={chat}
          setCurrentChat={setCurrentChat}
          showActionSheetWithOptions={showActionSheetWithOptions}
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
