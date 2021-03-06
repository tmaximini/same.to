import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { updateAuthHeader, updateUserId } from '../../services/api';
import { share } from '../../utils';
import {
  actions as authActions,
} from '../../redux/modules/auth';
import styles from './styles';

const logo = require('../../assets/same.png');

@connect(
  state => state.auth,
  authActions,
)
export default class Settings extends Component {

  render() {
    const settings = [
      {
        title: I18n.t('edit_profile'),
        action: () => {
          Actions.editCreateProfile({
            title: I18n.t('edit_profile')
          });
        }
      },
      {
        title: I18n.t('archive'),
        action: () => {
          Actions.archive();
        }
      },
      {
        title: I18n.t('logout'),
        action: () => {
          this.props.logout();
          updateUserId(null);
          updateAuthHeader(null);
          Actions.login({ type: 'reset' });
        }
      },
      {
        title: I18n.t('invite_friends'),
        action: share({
          message: 'Join me on same.to',
          url: 'sameto://invite/url/to/be/defined',
          title: I18n.t('invite_friends')
        }),
      },
      {
        title: I18n.t('send_feedback'),
        action: () => Actions.feedback(),
      },
      {
        title: I18n.t('impressum'),
        action: () => Actions.impressum(),
      },
      {
        title: I18n.t('privacy'),
        action: () => Actions.privacy(),
      },
    ];

    return (
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
  }
}

