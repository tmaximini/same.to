import React, { Component, PropTypes } from 'react';
import { ListView, Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ChatSelectorRow from './ChatSelector';

import Promise from 'bluebird'


const { width } = Dimensions.get('window');

const imgProfile = require('./Profilbild.png');
const secProfile = require('./secProfile.png');

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const demoObj = [{ name: 'Pascal Keller', location: 'Berlin', isSelected: false, uriProfile: imgProfile },
{ name: 'Melle Kørns', location: 'Denmark', isSelected: true, uriProfile: secProfile },
{ name: 'Diego Galindo', location: 'Copenhagen', isSelected: true, uriProfile: imgProfile }];


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
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#111111cc',
    },
    header: {
        color: 'white',
        marginLeft: 10,
        fontSize: 16
    }
});


const promOne = () => {
    return new Promise((resolve, reject) => {

    });
};

const promTwo = () => {
    return new Promise((resolve, reject) => {

    });
};


export default class ListChatFriends extends Component {

    //   static propTypes = {
    //     refresh: PropTypes.func,
    //   }

    constructor(props) {
        super(props);

        this.state = {
            source: demoObj,
            dataSource: ds.cloneWithRows(demoObj),
        };
    }


    componentWillMount = () => {
    }

    renderSectionHeader = (obj, name) => {
        return (
            <View style={{ margin: 10 }} key={name}>
                <Text style={styles.header}> Teilnehmer auswählen: </Text>
            </View>
        )
    }

    _onProfileClicked = rowId => {
        let i = parseInt(rowId, 10);
        console.log('open profile with: ', this.state.source[i]);
    }

    _onItemSelected = rowId => {
        let s = [...this.state.source];
        let i = parseInt(rowId, 10);

        let item = { ...s[i] };
        item.isSelected = !item.isSelected;
        s[i] = item;

        let dataSource = this.state.dataSource.cloneWithRows(s);
        this.setState({ source: s, dataSource });
    }

    _onStarChat = () => {
        let users = this.state.source.filter(i => i.isSelected);
    }

    renderContactListItem = (data, col, row) => {
        return (<ChatSelectorRow
            name={data.name}
            uriProfile={data.uriProfile}
            location={data.location}
            isSelected={data.isSelected}
            onProfile={this._onProfileClicked}
            onSelected={this._onItemSelected}
            rowId={row} />
        )
    }


    render = () => {
        const { dataSource } = this.state;
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <ListView
                    enableEmptySections
                    automaticallyAdjustContentInsets={false}
                    style={{ flex: 1, marginTop: 20 }}
                    dataSource={dataSource}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    renderRow={this.renderContactListItem} />
                <TouchableOpacity style={styles.btnStart} onPress={this._onStarChat}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Erstellen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

