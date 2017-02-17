import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import ContactCheckList from '../../components/ContactCheckList';
import { actions as chatActions } from '../../redux/modules/chats';
import styles from './styles';

@connect(
  state => state.chats,
  chatActions,
)
export default class EditCreateActivity extends Component {

  static propTypes = {
    updateChat: PropTypes.func.isRequired,
    currentChat: PropTypes.shape({
      subject: PropTypes.string,
      memberIds: PropTypes.array,
    }).isRequired,
    createChat: PropTypes.func.isRequired,
    updateRemoteChat: PropTypes.func.isRequired,
    toggleChatMember: PropTypes.func.isRequired,
    proposedSubject: PropTypes.string,
    proposedMembers: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  componentDidMount() {
    const { updateChat, proposedSubject } = this.props;
    if (proposedSubject) {
      updateChat('subject', proposedSubject);
    }
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
      toggleChatMember,
    } = this.props;

    return (
      <Form
        buttonText={currentChat.id ? 'Update' : 'Create'}
        onSubmit={() => this.saveItem()}
      >
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>
              Thema des Chats
            </Text>
          </View>
          <Input
            placeholder="Subject"
            onChangeText={text => updateChat('subject', text)}
            value={currentChat.subject}
          />
          {proposedMembers && (
            <View>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>
                  Chat mit folgenden Teilnehmern erstellen
                </Text>
              </View>
              <ContactCheckList
                members={proposedMembers}
                onToggle={toggleChatMember}
                activeMemberIds={currentChat.memberIds}
              />
            </View>
          )}
        </View>
      </Form>
    );
  }
}



