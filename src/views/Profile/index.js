import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const fallback = require('../../assets/hj.jpg');

const Profile = ({ profile }) => {
  const avatar = profile.image ? { uri: profile.image.thumbs['320x320'] } : fallback;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
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
};

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
