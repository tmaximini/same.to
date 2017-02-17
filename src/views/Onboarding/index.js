import React from 'react';
import { View, Text, Image } from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import Form from '../../layouts/form';
import styles from './styles';

const ob1 = require('../../assets/Onboarding1.png');
const ob2 = require('../../assets/Onboarding2.png');
const ob3 = require('../../assets/Onboarding3.png');

export const Onboarding1 = () => (
  <Form
    buttonText={I18n.t('next')}
    onSubmit={Actions.onboarding2}
  >
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={ob1}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {I18n.t('onboarding1')}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {I18n.t('onboarding2')}
        </Text>
      </View>
      <View style={styles.dots}>
        <Icon
          name="dot-circle-o"
          size={22}
          style={[styles.icon, styles.iconActive]}
        />
        <EntypoIcon
          name="dot-single"
          size={24}
          style={styles.icon}
        />
        <EntypoIcon
          name="dot-single"
          size={24}
          style={styles.icon}
        />
      </View>
    </View>
  </Form>
);

export const Onboarding2 = () => (
  <Form
    buttonText={I18n.t('next')}
    onSubmit={Actions.onboarding3}
  >
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={ob2}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {I18n.t('onboarding3')}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {I18n.t('onboarding4')}
        </Text>
      </View>
      <View style={styles.dots}>
        <EntypoIcon
          name="dot-single"
          size={24}
          style={styles.icon}
        />
        <Icon
          name="dot-circle-o"
          size={22}
          style={[styles.icon, styles.iconActive]}
        />
        <EntypoIcon
          name="dot-single"
          size={24}
          style={styles.icon}
        />
      </View>
    </View>
  </Form>
);


export const Onboarding3 = () => (
  <Form
    buttonText={I18n.t('i_am_ready')}
    onSubmit={() => {
      Actions.tabbar({ key: 'tabbar', type: 'reset', onBack: null, hideBackImage: true });
      Actions.home({ type: 'reset', onBack: null, hideBackImage: true });
    }}
  >
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={ob3}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {I18n.t('onboarding5')}
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {I18n.t('onboarding6')}
        </Text>
      </View>
      <View style={styles.dots}>
        <EntypoIcon
          name="dot-single"
          size={22}
          style={styles.icon}
        />
        <EntypoIcon
          name="dot-single"
          size={22}
          style={styles.icon}
        />
        <Icon
          name="dot-circle-o"
          size={22}
          style={[styles.icon, styles.iconActive]}
        />
      </View>
    </View>
  </Form>
);

