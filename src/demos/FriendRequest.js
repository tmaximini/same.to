import React, { Component, PropTypes } from 'react';
import { Dimensions, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const imgProfile = require('./Profilbild.png');
const icAccept = require('./ic_accept.png');
const icReject = require('./ic_reject.png');


const styles = StyleSheet.create({
    container: {
        height: 80,
        width,
        padding: 10,
        flexDirection: 'row'
    },
    imgProfile: {
        height: 55,
        width: 80
    },
    middleContainer: {
        height: 60,
        flex: 1,
        paddingLeft: 10
    },
    optionsContainer: {
        height: 60,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    iconOption: {
        height: 30,
        marginLeft: 10,
        flex: 1
    }
});


class FriendRequestRow extends Component {
    static propTypes = {
        // uriProfile: PropTypes.string,
        name: PropTypes.string.isRequired,
        onAccepted: PropTypes.func.isRequired,
        onRejected: PropTypes.func.isRequired,
        onPressed: PropTypes.func.isRequired,
        rowId: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired
    }

    render = () => {
        const { uriProfile, name, location, onAccepted, onRejected, rowId, onPressed } = this.props;
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => onPressed(rowId)}>
                    <Image style={styles.imgProfile} source={uriProfile} resizeMode={Image.resizeMode.contain} />
                </TouchableOpacity>
                <View style={styles.middleContainer} >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{name}</Text>
                    <Text style={{ color: 'white', marginTop: 10 }}>{location}</Text>
                </View>
                <View style={styles.optionsContainer} >
                    <TouchableOpacity onPress={() => onAccepted(rowId)}>
                        <Image style={styles.iconOption} source={icReject} resizeMode={Image.resizeMode.contain} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onRejected(rowId)}>
                        <Image style={styles.iconOption} source={icAccept} resizeMode={Image.resizeMode.contain} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


class FriendRow extends Component {
    static propTypes = {
        // uriProfile: PropTypes.string,
        name: PropTypes.string.isRequired,
        onAccepted: PropTypes.func.isRequired,
        onRejected: PropTypes.func.isRequired,
        onPressed: PropTypes.func.isRequired,
        rowId: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired
    }

    render = () => {
        const { uriProfile, name, location, onAccepted, onRejected, rowId, onPressed } = this.props;
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => onPressed(rowId)}>
                    <Image style={styles.imgProfile} source={uriProfile} resizeMode={Image.resizeMode.contain} />
                </TouchableOpacity>
                <View style={styles.middleContainer} >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} numberOfLines={1}>{name}</Text>
                    <Text style={{ color: 'white', marginTop: 10 }}>{location}</Text>
                </View>
            </View>
        )
    }
}


export { FriendRow, FriendRequestRow };

