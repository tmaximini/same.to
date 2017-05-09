import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

const { width } = Dimensions.get('window');

const icTick = require('./tick.png');

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width - 40,
    flexDirection: 'row',
    padding: 0,
    margin: 0
  },
  imgProfile: {
    height: 55,
    width: 80
  },
  middleContainer: {
    height: 60,
    flex: 1
  },
  optionsContainer: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232529',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  iconOption: {
    alignItems: 'center',
    flex: 1
  },
  mainLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default class ChatSelectorRow extends Component {
  static propTypes = {
    // uriProfile: PropTypes.string,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    onProfile: PropTypes.func.isRequired,
    rowId: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  };

  render = () => {
    const {
      uriProfile,
      name,
      location,
      onSelected,
      rowId,
      onProfile,
      isSelected,
      id
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onProfile(rowId)}>
          <Image
            style={styles.imgProfile}
            source={uriProfile}
            resizeMode={Image.resizeMode.contain}
          />
        </TouchableOpacity>
        <View style={styles.middleContainer}>
          <Text style={styles.mainLabel} numberOfLines={1}>{name}</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>{location}</Text>
        </View>
        <TouchableOpacity
          style={styles.optionsContainer}
          onPress={() => onSelected(id)}
        >
          {isSelected
            ? <Image
              style={styles.iconOption}
              source={icTick}
              resizeMode={Image.resizeMode.contain}
            />
            : null}
        </TouchableOpacity>
      </View>
    );
  };
}
