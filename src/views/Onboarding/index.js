import React from 'react';
import { View, Text, Image } from 'react-native';
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
    buttonText="Weiter"
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
          Plane deine Reise, Unterkunft und Aktivitäten
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Finde Matches aus deiner Region für eine gemeinsame Anreise und Aktivitäten.
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
    buttonText="Weiter"
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
          Plane Aktivitäten wie Feiern, Sport, Networking oder Dating.
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Lade Freunde dazu ein und finde Gleichgesinnte aus der Region.
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
    buttonText="Ich bin bereit"
    onSubmit={() => {
      Actions.tabbar({ key: 'tabbar', type: 'replace' });
      Actions.home({ type: 'replace' });
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
          Finde Gleichgesinnte in deiner Nähe.
        </Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Suche einfach nach Interessen, Orten, Uni uvm.
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

