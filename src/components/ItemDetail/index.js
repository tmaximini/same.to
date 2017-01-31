import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import ContactList from '../ContactList';
import Date from '../Date';
import OnOffSwitch from '../OnOffSwitch';
import TagList from '../TagList';
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
          <View style={styles.headerWrapper}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>
                {item.name}
              </Text>
            </View>
            <View style={styles.date}>
              <Date
                date={item.startAt}
              />
            </View>
            <View style={styles.tags}>
              <TagList
                tags={item.types}
              />
            </View>
            <View style={styles.topRight}>
              <OnOffSwitch
                name="Ich nehme teil"
                value={false}
                onChange={() => {}}
              />
            </View>
          </View>
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
