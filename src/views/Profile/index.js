import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Profile = ({ profile }) => {

  console.log('profile', profile);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>PROFIL</Text>
      </View>
    </View>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
