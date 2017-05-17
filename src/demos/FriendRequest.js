import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import CachedImage from 'react-native-cached-image';

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
    height: 52,
    width: 52
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
    image: PropTypes.object,
    fullName: PropTypes.string.isRequired,
    onAccepted: PropTypes.func.isRequired,
    onRejected: PropTypes.func.isRequired,
    onPressed: PropTypes.func.isRequired,
    rowId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };

  render = () => {
    const {
      image,
      fullName,
      location,
      onAccepted,
      onRejected,
      rowId,
      onPressed
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPressed(rowId)}>
          <CachedImage
            style={styles.imgProfile}
            borderRadius={26}
            source={image || imgProfile}
            resizeMode={Image.resizeMode.contain}
          />
        </TouchableOpacity>
        <View style={styles.middleContainer}>
          <Text
            style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <Text style={{ color: 'white', marginTop: 10 }}>
            {location.formattedAddress}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={onRejected}>
            <Image
              style={styles.iconOption}
              source={icReject}
              resizeMode={Image.resizeMode.contain}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAccepted}>
            <Image
              style={styles.iconOption}
              source={icAccept}
              resizeMode={Image.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

class FriendRow extends Component {
  static propTypes = {
    image: PropTypes.object,
    fullName: PropTypes.string.isRequired,
    onAccepted: PropTypes.func.isRequired,
    onRejected: PropTypes.func.isRequired,
    onPressed: PropTypes.func.isRequired,
    rowId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };

  render = () => {
    const { image, fullName, location, rowId, onPressed } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPressed(rowId)}>
          <Image
            style={styles.imgProfile}
            source={image.thumbs}
            resizeMode={Image.resizeMode.contain}
          />
        </TouchableOpacity>
        <View style={styles.middleContainer}>
          <Text
            style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <Text style={{ color: 'white', marginTop: 10 }}>
            {location.formattedAddress}
          </Text>
        </View>
      </View>
    );
  };
}

export { FriendRow, FriendRequestRow };
