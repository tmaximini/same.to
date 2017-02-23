import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import CachedImage from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { actions as contactActions } from '../../redux/modules/contacts';
import { getUserId } from '../../services/api';
import styles from './styles';

const fallback = require('../../assets/avatar.png');


@connect(
  state => ({
    myProfile: state.editCreateProfile.profile
  }),
  contactActions,
)
export default class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    myProfile: PropTypes.object.isRequired,
    removeContact: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    addContact: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
  }

  render() {
    const {
      profile,
      removeContact,
      removeFavorite,
      addContact,
      addFavorite,
      myProfile,
    } = this.props;

    const avatar = profile.image ? { uri: profile.image.thumbs['320x320'] } : fallback;
    const isFavorite = myProfile.favoriteIds.includes(profile.id);
    const isContact = myProfile.contactIds.includes(profile.id);
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <CachedImage
            style={styles.avatar}
            resizeMode="cover"
            source={avatar}
          />
          <View style={styles.textBox}>
            <Text style={styles.text}>{profile.location ? profile.location.locality : ''}</Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>{profile.occupation ? profile.occupation : ''}</Text>
          </View>
          {!profile.id !== getUserId() && (
            <View style={styles.actions}>
              <TouchableHighlight
                style={styles.iconButton}
                onPress={() => (isFavorite ? removeFavorite(profile) : addFavorite(profile))}
                activeOpacity={0.6}
                underlayColor="transparent"
              >
                <Icon
                  name={isFavorite ? 'ios-star' : 'ios-star-outline'}
                  style={styles.icon}
                  size={35}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.iconButton}
                onPress={() => (isContact ? removeContact(profile) : addContact(profile))}
                activeOpacity={0.6}
                underlayColor="transparent"
              >
                <Icon
                  name="ios-person-add"
                  name={isContact ? 'ios-person' : 'ios-person-add-outline'}
                  style={styles.icon}
                  size={35}
                />
              </TouchableHighlight>
            </View>
          )}
          <View style={styles.interests}>
            {profile.interests && profile.interests.length ?
              (profile.interests
                .filter(interest => typeof interest === 'string' && interest.length > 1)
                .map((interest, index) => (
                  <View key={index} style={styles.interestBox}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
              ) : null)
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
