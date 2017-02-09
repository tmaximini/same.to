import React, { PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { purgeOfflineStorage } from '../../redux/configureStore';
import { updateAuthHeader, updateUserId } from '../../services/api';
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
    title: 'Impressum',
    action: () => {},
  },
  {
    title: 'Whatever',
    action: () => {},
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
