import React, { Component, PropTypes } from 'react';
import { View, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { Actions } from 'react-native-router-flux';
import {
  actions as chatActions
} from '../../redux/modules/chats';
import ChatList from '../../components/ChatList';
import Button from '../../components/Button';
import Search from '../../components/Search';
import styles from './styles';

@connect(
  state => ({
    ...state.chats,
    contacts: state.contacts.contacts
  }),
  chatActions,
)
@connectActionSheet
class Chats extends Component {
  static propTypes = {
    chats: PropTypes.arrayOf(
      PropTypes.object,
    ),
    contacts: PropTypes.arrayOf(
      PropTypes.object,
    ),
    setCurrentChat: PropTypes.func.isRequired,
    fetchChats: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    const { chats } = props;
    this.state = {
      chats
    };
    this.filterResults = this.filterResults.bind(this);
    this.onConnectivityChange = this.onConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.fetchChats();
      }
    });
    NetInfo.isConnected.addEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chats: nextProps.chats
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
      this.props.fetchChats();
    }
  }

  filterResults(query) {
    const q = query.toLowerCase();
    this.setState({
      chats: _.filter(this.props.chats, item =>
        (item.subject && item.subject.toLowerCase().includes(q))
      )
    });
  }

  render() {
    const {
      isRefreshing,
      fetchChats,
      setCurrentChat,
      contacts,
    } = this.props;
    const { chats } = this.state;
    return (
      <View style={styles.container}>
        <Search
          onCancel={() => this.setState({ chats: this.props.chats })}
          onSearch={text => this.filterResults(text)}
          onChange={text => this.filterResults(text)}
        />
        <View style={styles.wrapper}>
          <ChatList
            {...this.props}
            chats={chats}
            setCurrentChat={setCurrentChat}
            isRefreshing={isRefreshing}
            refresh={fetchChats}
          />
        </View>
        <Button
          text={I18n.t('create_chat')}
          onPress={() => {
            Actions.editCreateChat({
              proposedSubject: '',
              proposedMembers: contacts,
            });
          }}
          style={{ marginHorizontal: 12 }}
          noResize
        />
      </View>
    );
  }
}

export default Chats;
