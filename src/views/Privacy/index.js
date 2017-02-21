import React from 'react';
import I18n from 'react-native-i18n';
import { ScrollView, Text } from 'react-native';
import styles from './styles';

const Privacy = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.impressumText}>
      {I18n.t('impressumText')}
    </Text>
  </ScrollView>
);

export default Privacy;
