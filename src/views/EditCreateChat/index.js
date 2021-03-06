import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import ContactCheckList from '../../components/ContactCheckList';
import ChatSelector from '../../components/ChatSelector';
import { actions as chatActions } from '../../redux/modules/chats';
import styles from './styles';

@connect(state => state.chats, chatActions)
export default class EditCreateChat extends Component {
  static propTypes = {
    updateChat: PropTypes.func.isRequired,
    currentChat: PropTypes.shape({
      subject: PropTypes.string,
      memberIds: PropTypes.array
    }).isRequired,
    createChat: PropTypes.func.isRequired,
    updateRemoteChat: PropTypes.func.isRequired,
    toggleChatMember: PropTypes.func.isRequired,
    proposedMembers: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem() {
    const { currentChat, createChat, updateRemoteChat } = this.props;
    if (currentChat.id) {
      updateRemoteChat(currentChat);
    } else {
      createChat(currentChat);
    }
  }

  render() {
    const {
      currentChat,
      updateChat,
      proposedMembers,
      toggleChatMember
    } = this.props;

    return (
      <Form
        buttonText={currentChat.id ? I18n.t('save') : I18n.t('create')}
        onSubmit={() => this.saveItem()}
      >
        <View style={styles.wrapper}>
          <Input
            placeholder={I18n.t('subject')}
            onChangeText={text => updateChat('subject', text)}
            value={currentChat.subject}
          />
          {proposedMembers &&
            <ChatSelector
              members={proposedMembers}
              onToggle={toggleChatMember}
              activeMemberIds={currentChat.memberIds}
            />}
          {/*<ContactCheckList
                noIcons
                members={proposedMembers}
                onToggle={toggleChatMember}
                activeMemberIds={currentChat.memberIds}
              />*/}
        </View>
      </Form>
    );
  }
}
