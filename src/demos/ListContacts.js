import React, { Component, PropTypes } from 'react';
import { ListView, Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FriendRequestRow, FriendRow } from './FriendRequest';

const { width } = Dimensions.get('window');

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});


const imgProfile = require('./Profilbild.png');
const secProfile = require('./secProfile.png');


const demoObj = {
    userRequest: [{ name: 'Pascal Keller', location: 'Berlin', isSelected: false, uriProfile: imgProfile },
    { name: 'Melle Kørns', location: 'Denmark', isSelected: true, uriProfile: secProfile },
    { name: 'Diego Galindo', location: 'Copenhagen', isSelected: true, uriProfile: imgProfile }],
    contacts: [{ name: 'Pascal Keller', location: 'Berlin', isSelected: false, uriProfile: imgProfile },
    { name: 'Melle Kørns', location: 'Denmark', isSelected: true, uriProfile: secProfile },
    { name: 'Diego Galindo', location: 'Copenhagen', isSelected: true, uriProfile: imgProfile }]
}


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

export default class ListChatFriends extends Component {

    //   static propTypes = {
    //     refresh: PropTypes.func,
    //   }

    constructor(props) {
        super(props)

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(demoObj) //should come from props
        };
    }

    renderSectionHeader = (obj, name) => {

        if (name === 'userRequest') return null
        return (
            <View style={{ margin: 10 }} key={name}>
                <Text style={styles.header}> Kontakte </Text>
            </View>
        )
    }

    renderContactListItem = (data, col, row) => {

        if (col === 'userRequest') {
            return (<FriendRequestRow
                key={col + row}
                name={data.name}
                uriProfile={data.uriProfile}
                location={data.location}
                onPressed={rowId => { }}
                onAccepted={rowId => { }}
                onRejected={rowId => { }}
                rowId={col + row} />)
        }
        else {
            return (<FriendRow
                key={col + row}
                name={data.name}
                uriProfile={data.uriProfile}
                location={data.location}
                onPressed={rowId => { }}
                onAccepted={rowId => { }}
                onRejected={rowId => { }}
                rowId={col + row} />)
        }
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
                    <Text style={{ color: 'white', fontSize: 18 }}>Nutzer einladen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}