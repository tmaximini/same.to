import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { purgeOfflineStorage } from '../../redux/configureStore';
import { updateAuthHeader, updateUserId } from '../../services/api';
import { share } from '../../utils';
import styles from './styles';

const logo = require('../../assets/same.png');

const settings = [
  {
    title: 'Edit Profile',
    action: () => {
      Actions.editCreateProfile({
        title: 'Edit Profile'
      });
    }
  },
  {
    title: 'Logout',
    action: () => {
      updateUserId(null);
      updateAuthHeader(null);
      purgeOfflineStorage();
      Actions.login({ type: 'reset' });
    }
  },
  {
    title: 'Freunde einladen',
    action: share({
      message: 'Join me on same.to',
      url: 'sameto://invite/url/to/be/defined',
      title: 'Invite friend'
    }),
  },
  {
    title: 'Feedback senden',
    action: () => Actions.feedback(),
  },
  {
    title: 'Impressum',
    action: () => Actions.impressum(),
  },
];

const Settings = () => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.settings}>
        {settings.map(s => (
          <TouchableHighlight
            key={s.title}
            style={styles.setting}
            onPress={s.action}
            activeOpacity={0.6}
            underlayColor="transparent"
          >
            <Text style={styles.settingText}>
              {s.title}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
      <View style={styles.logoWrapper}>
        <Image
          source={logo}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </View>
  </View>
);

Settings.propTypes = {};

export default Settings;
