import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight, Image, Dimensions } from 'react-native';
import { share } from '../../utils';
import ContactList from '../ContactList';
import Date from '../Date';
import Button from '../Button';
import OnOffSwitch from '../OnOffSwitch';
import TagList from '../TagList';
import styles from './styles';

const plansee = require('../../assets/plansee.jpg');

const { width } = Dimensions.get('window');


const ItemDetail = ({ itemType, participates, onToggle, item }) => (
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
                tags={item.categories}
              />
            </View>
            <View style={styles.topRight}>
              <OnOffSwitch
                value={participates}
                onChange={() => onToggle({
                  item,
                  itemType
                })}
              />
              <Text style={styles.participateText}>
                Ich nehme teil
              </Text>
            </View>
          </View>
        </View>
      </Image>
      <View style={styles.details}>
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.box}
            onPress={share({
              message: `check out this ${itemType}`,
              url: `sameto://events/${item.eventId}/${itemType}s/${item.id}`,
              title: `${item.name} - ${itemType}`
            })}
          >
            <Text style={styles.boxText}>Share</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.box, styles.lastBox]}
            onPress={share({
              message: `check out this ${itemType}`,
              url: `sameto://events/${item.eventId}/${itemType}s/${item.id}`,
              title: `${item.name} - ${itemType}`
            })}
          >
            <Text style={styles.boxText}>Invite</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    <View style={styles.bottom}>
      <ContactList
        contacts={item.members}
      />
    </View>
    <View style={styles.actionButtons}>
      <Button
        text="Chat erstellen"
        onPress={() => {}}
        style={{ width: (width / 2) - 15 }}
      />
      <Button
        text="Alle Teilnehmer"
        onPress={() => {}}
        style={{ width: (width / 2) - 15 }}
      />
    </View>
  </View>
);

ItemDetail.propTypes = {
  itemType: PropTypes.string,
  item: PropTypes.object.isRequired,
  participates: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ItemDetail;
