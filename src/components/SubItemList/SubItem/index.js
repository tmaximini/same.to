import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { canEdit } from '../../../utils';
import Date from '../../Date';
import TagList from '../../TagList';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const SubItem = ({ itemType, item, onSelect, setDetail }) => {
  // will be called by pressing right navbar button
  const editFunc = () => {
    onSelect(item);
    switch (itemType) {
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

  const handler = (type, model) => {
    // set redux active item
    setDetail({
      itemType: type,
      item: model,
    });

    // params are same for all routes
    const params = {
      onRight: canEdit(model) ? editFunc : undefined,
      rightTitle: canEdit(model) ? 'edit' : undefined,
    };

    // handle route depending on item type
    switch (type) {
      case 'trip':
        return Actions.trip(params);
      case 'accommodation':
        return Actions.accommodation(params);
      default:
        return Actions.activity(params);
    }
  };

  const title = item.name ? item.name : itemType;

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
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              {itemType === 'trip' &&
                <Text numberOfLines={1} style={styles.subTitle}>{getSubTitle(item)}</Text>
              }
            </View>
            <View style={styles.middle}>
              <Icon
                size={32}
                name="ios-arrow-forward"
                style={styles.titleCaret}
              />
              <Date
                date={item.startAt || item.startDate}
              />
            </View>
            <View style={styles.bottom}>
              <TagList
                align="flex-end"
                tags={item.categories}
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
  setDetail: PropTypes.func.isRequired,
};

export default SubItem;



