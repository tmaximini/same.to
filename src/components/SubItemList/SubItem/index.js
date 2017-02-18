import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { canEdit } from '../../../utils';
import Date from '../../Date';
import TagList from '../../TagList';
import { COLORS } from '../../../constants';
import styles from './styles';

const background = require('../../../assets/sunflowers.jpg');

const SubItem = ({ itemType, item, onSelect, setDetail, showActionSheetWithOptions }) => {
  // will be called by pressing right navbar button
  const editFunc = () => {
    onSelect(item);
    switch (itemType) {
      case 'trip':
        return Actions.editCreateTrip({
          title: I18n.t('edit_trip'),
        });
      case 'accommodation':
        return Actions.editCreateAccommodation({
          title: I18n.t('edit_accommodation'),
        });
      default:
        return Actions.editCreateActivity({
          title: I18n.t('edit_activity'),
        });
    }
  };

  const showAndHandleActionSheet = () => {
    const options = [I18n.t('edit'), I18n.t('delete'), I18n.t('cancel')];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    (buttonIndex) => {
      // Do something here depending on the button index selected
      if (buttonIndex === 0) {
        // edit
        editFunc();
      }
      if (buttonIndex === 1) {
        // delete
        console.log('delete event');
      }
    });
  };

  const renderRightButton = () => (
    <TouchableOpacity
      onPress={showAndHandleActionSheet}
    >
      <EntypoIcon
        name="dots-three-horizontal"
        color={COLORS.CYAN}
        size={22}
      />
    </TouchableOpacity>
  );

  const handler = (type, model) => {
    // set redux active item
    setDetail({
      itemType: type,
      item: model,
    });

    // params are same for all routes
    const params = {
      renderRightButton: canEdit(model) ? renderRightButton : undefined,
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
    const from = it.pickupLocation ? it.pickupLocation.locality : I18n.t('unknown');
    const to = it.destinationLocation ? it.destinationLocation.locality : I18n.t('unknown');

    return `${I18n.t('from')} ${from} ${I18n.t('to')} ${to}`;
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
  showActionSheetWithOptions: PropTypes.func.isRequired,
};

export default SubItem;



