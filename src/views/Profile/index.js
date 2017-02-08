import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const Profile = ({ profile }) => {

  const avatar = profile.image ? profile.image.thumbs['320x320'] : null;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={{ uri: avatar }}
        />
        <View style={styles.textBox}>
          <Text style={styles.text}>Berlin</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>{profile.occupation}</Text>
        </View>
        <View style={styles.interests}>
          {profile.interests.map((interest, index) => (
            <View key={index} style={styles.interestBox}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
