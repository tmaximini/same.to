import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { formatDate } from '../../../utils';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const SubItem = ({ itemType, item }) => {

  const handler = (type, model) => {
    switch (type) {
      case 'trip':
        return Actions.editCreateTrip({
          title: 'Edit Trip',
          trip: model
        });
      case 'accommodation':
        return Actions.editCreateAccommodation({
          title: 'Edit Accommodation',
          accomodation: model
        });
      default:
        return Actions.editCreateActivity({
          title: 'Edit Activity',
          activity: model
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={background}
      >
        <TouchableHighlight
          style={styles.touch}
          onPress={() => handler(itemType, item)}
        >
          <View style={styles.wrapper}>
            <View style={styles.top}>
              <Text style={styles.title}>{itemType}</Text>
            </View>
            <View style={styles.middle}>
              <Text style={styles.button}>></Text>
            </View>
            <View style={styles.bottom}></View>
          </View>
        </TouchableHighlight>
      </Image>
    </View>
  );
};

SubItem.propTypes = {
  itemType: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};

export default SubItem;



