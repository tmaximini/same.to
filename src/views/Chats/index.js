import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { Actions } from 'react-native-router-flux';
import {
  actions as chatActions
} from '../../redux/modules/chats';
import ChatList from '../../components/ChatList';
import Form from '../../layouts/form';
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
  }

  componentWillMount() {
    this.props.fetchChats();
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      chats: nextProps.chats
    });
  }

  filterResults(query) {
    const q = query.toLowerCase();
    console.log('filtering', q);
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
        <Form
          buttonText={I18n.t('create_chat')}
          onSubmit={() => {
            Actions.editCreateChat({
              proposedSubject: '',
              proposedMembers: contacts,
            });
          }}
          style={{ paddingHorizontal: 0 }}
          buttonProps={{
            style: {
              marginHorizontal: 12
            }
          }}
        >
          <ChatList
            {...this.props}
            chats={chats}
            setCurrentChat={setCurrentChat}
            isRefreshing={isRefreshing}
            refresh={fetchChats}
          />
        </Form>
      </View>
    );
  }
}

export default Chats;
