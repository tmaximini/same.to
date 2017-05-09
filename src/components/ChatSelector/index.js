import React, { Component } from 'react';
import { ListView, Dimensions, View, StyleSheet, Text } from 'react-native';
import I18n from 'react-native-i18n';
import ChatSelectorRow from './ChatSelectorRow';

const { width } = Dimensions.get('window');

const imgProfile = require('./Profilbild.png');
const secProfile = require('./secProfile.png');

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const demoObj = [
  {
    name: 'Pascal Keller',
    location: 'Berlin',
    isSelected: false,
    uriProfile: imgProfile
  },
  {
    name: 'Melle Kørns',
    location: 'Denmark',
    isSelected: true,
    uriProfile: secProfile
  },
  {
    name: 'Diego Galindo',
    location: 'Copenhagen',
    isSelected: true,
    uriProfile: imgProfile
  }
];

const styles = StyleSheet.create({
  btnStart: {
    width: width - 40,
    margin: 20,
    backgroundColor: '#1BCBC7',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    flex: 1,
    marginLeft: 90,
    marginRight: 20,
    marginBottom: 20,
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
  constructor(props) {
    super(props);

    console.log('props.members', props.members);

    this.state = {
      source: props.members,
      dataSource: ds.cloneWithRows(props.members)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      source: nextProps.members,
      dataSource: ds.cloneWithRows(nextProps.members)
    };
  }

  renderSectionHeader = (obj, name) => {
    return (
      <View style={{ margin: 10 }} key={name}>
        <Text style={styles.header}>{I18n.t('create_chat_members')}</Text>
      </View>
    );
  };

  _onProfileClicked = rowId => {
    let i = parseInt(rowId, 10);
    console.log('open profile with: ', this.state.source[i]);
  };

  _onItemSelected = rowId => {
    const { onToggle } = this.props;
    let s = [...this.state.source];
    let i = parseInt(rowId, 10);

    let item = { ...s[i] };
    item.isSelected = !item.isSelected;
    s[i] = item;
    onToggle(item.id);

    let dataSource = this.state.dataSource.cloneWithRows(s);
    this.setState({ source: s, dataSource });
  };

  renderContactListItem = (data, col, row) => {
    const { onToggle, activeMemberIds } = this.props;
    console.log(
      'data',
      data,
      activeMemberIds,
      activeMemberIds.includes(data.id)
    );

    return (
      <ChatSelectorRow
        name={data.fullName}
        id={data.id}
        uriProfile={imgProfile}
        location={data.location.formattedAddress || 'not set'}
        isSelected={activeMemberIds.includes(data.id)}
        onProfile={this._onProfileClicked}
        onSelected={onToggle}
        rowId={row}
      />
    );
  };

  render() {
    const { dataSource } = this.state;
    return (
      <ListView
        enableEmptySections
        automaticallyAdjustContentInsets
        style={{ flex: 1, marginTop: 20 }}
        dataSource={dataSource}
        renderSectionHeader={this.renderSectionHeader}
        renderSeparator={(sectionId, rowId) => (
          <View key={rowId} style={styles.separator} />
        )}
        renderRow={this.renderContactListItem}
      />
    );
  }
}
