import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import ContactList from '../ContactList';
import styles from './styles';

const plansee = require('../../assets/plansee.jpg');

const ItemDetail = ({ itemType, item }) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <Image
        style={styles.bgImage}
        source={plansee}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {itemType} - {item.id}
          </Text>
        </View>
      </Image>
      <View style={styles.details}>
        <View style={styles.buttons}>
          <View style={styles.box}>
            <TouchableHighlight
              onPress={this.shareEvent}
            >
              <Text style={styles.boxText}>Share</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.box, styles.lastBox]}>
            <Text style={styles.boxText}>Invite</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.bottom}>
      <ContactList
        contacts={item.members}
      />
    </View>
  </View>
);

ItemDetail.propTypes = {
  itemType: PropTypes.string,
  item: PropTypes.object.isRequired,
};

export default ItemDetail;
