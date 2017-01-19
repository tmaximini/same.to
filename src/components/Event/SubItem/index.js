import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { formatDate } from '../../../utils';
import Date from '../../Date';
import TagList from '../../TagList';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const SubItem = ({ itemType, item, onSelect }) => {
  const handler = (type, model) => {
    // set redux active item
    onSelect(model);
    // handle route depending on item type
    switch (type) {
      case 'trip':
        return Actions.editCreateTrip({
          title: 'Edit Trip',
        });
      case 'accommodation':
        return Actions.editCreateAccommodation({
          title: 'Edit Accommodation',
        });
      default:
        return Actions.editCreateActivity({
          title: 'Edit Activity',
        });
    }
  };

  const getSubTitle = it => {
    const from = it.pickupLocation ? it.pickupLocation.locality : 'Unknown';
    const to = it.destinationLocation ? it.destinationLocation.locality : 'Unknown';

    return `Von ${from} nach ${to}`;
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
              {itemType === 'trip' &&
                <Text style={styles.subTitle}>{getSubTitle(item)}</Text>
              }
            </View>
            <View style={styles.middle}>
              <Text style={styles.button}>></Text>
              <Date
                date={item.startAt || item.startDate}
              />
            </View>
            <View style={styles.bottom}>
              <TagList
                tags={[item.type]}
              />
            </View>
          </View>
        </TouchableHighlight>
      </Image>
    </View>
  );
};

SubItem.propTypes = {
  itemType: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SubItem;



