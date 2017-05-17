import React, { Component, PropTypes } from 'react';
import { ListView, View, StyleSheet, Text } from 'react-native';
import { FriendRequestRow, FriendRow } from './FriendRequest';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    marginLeft: 90,
    marginRight: 20,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#111111cc'
  },
  header: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16
  }
});

export default class ListChatFriends extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    contactRequests: PropTypes.array,
    acceptContact: PropTypes.func,
    declineContact: PropTypes.func
  };

  constructor(props) {
    super(props);

    const data = {
      userRequest: props.contactRequests,
      contacts: props.contacts
    };

    console.log(data);

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(data) //should come from props
    };
  }

  renderSectionHeader = (obj, name) => {
    if (name === 'userRequest' || this.props.contacts.length === 0) return null;
    return (
      <View style={{ margin: 10 }} key={name}>
        <Text style={styles.header}> Kontakte </Text>
      </View>
    );
  };

  renderContactListItem = (data, col, row) => {
    const { acceptContact, declineContact } = this.props;

    console.log('image', data);

    if (col === 'userRequest') {
      return (
        <FriendRequestRow
          key={col + row}
          fullName={data.fullName}
          image={data.image}
          location={data.location}
          onPressed={rowId => {}}
          onAccepted={() => acceptContact(data)}
          onRejected={() => declineContact(data)}
          rowId={col + row}
        />
      );
    } else {
      return (
        <FriendRow
          key={col + row}
          fullName={data.fullName}
          image={data.image}
          location={data.location}
          onPressed={rowId => {}}
          onAccepted={rowId => {}}
          onRejected={rowId => {}}
          rowId={col + row}
        />
      );
    }
  };

  render = () => {
    const { dataSource } = this.state;
    return (
      <ListView
        enableEmptySections
        automaticallyAdjustContentInsets={false}
        style={{ marginTop: 20 }}
        dataSource={dataSource}
        renderSectionHeader={this.renderSectionHeader}
        renderSeparator={(sectionId, rowId) => (
          <View key={rowId} style={styles.separator} />
        )}
        renderRow={this.renderContactListItem}
      />
    );
  };
}
