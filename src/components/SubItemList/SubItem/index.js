import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { canEdit } from '../../../utils';
import EditButton from '../../EditButton';
import Date from '../../Date';
import TagList from '../../TagList';
import styles from './styles';

const tripFallback = require('../../../assets/Fallback_Trip.png');
const accoFallback = require('../../../assets/Fallback_Accomodity.png');
const activityFallback = require('../../../assets/Fallback_Activity.png');

const SubItem = ({
  itemType,
  item,
  onSelect,
  setDetail,
  showActionSheetWithOptions,
  deleteTrip,
  deleteAccommodation,
  deleteActivity
}) => {
  // will be called by pressing right navbar button
  const editFunc = () => {
    onSelect(item);
    switch (itemType) {
      case 'trip':
        return Actions.editCreateTrip({
          title: I18n.t('edit_trip')
        });
      case 'accommodation':
        return Actions.editCreateAccommodation({
          title: I18n.t('edit_accommodation')
        });
      default:
        return Actions.editCreateActivity({
          title: I18n.t('edit_activity')
        });
    }
  };

  const deleteFunc = () => {
    switch (itemType) {
      case 'trip':
        return deleteTrip(item);
      case 'accommodation':
        return deleteAccommodation(item);
      default:
        return deleteActivity(item);
    }
  };

  const showAndHandleActionSheet = () => {
    const options = [I18n.t('edit'), I18n.t('delete'), I18n.t('cancel')];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        if (buttonIndex === 0) {
          // edit
          editFunc();
        }
        if (buttonIndex === 1) {
          // delete
          deleteFunc();
        }
      }
    );
  };

  const renderRightButton = () => (
    <EditButton onPress={showAndHandleActionSheet} />
  );

  const handler = (type, model) => {
    // set redux active item
    setDetail({
      itemType: type,
      item: model
    });

    // params are same for all routes
    const params = {
      renderRightButton: canEdit(model) ? renderRightButton : undefined
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

  const title = item.name ? item.name : I18n.t(itemType);

  const getSubTitle = it => {
    const from = it.pickupLocation
      ? it.pickupLocation.locality
      : I18n.t('unknown');
    const to = it.destinationLocation
      ? it.destinationLocation.locality
      : I18n.t('unknown');

    return `${I18n.t('from')} ${from} ${I18n.t('to')} ${to}`;
  };

  const getImage = () => {
    if (
      item && item.image && item.image.thumbs && item.image.thumbs['750x500']
    ) {
      return { uri: item.image.thumbs['750x500'] };
    }
    switch (itemType) {
      case 'trip':
        return tripFallback;
      case 'accommodation':
        return accoFallback;
      default:
        return activityFallback;
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={getImage(item)} borderRadius={5}>
        <TouchableHighlight
          style={styles.touch}
          onPress={() => handler(itemType, item)}
          activeOpacity={0.6}
          underlayColor="transparent"
        >
          <View style={styles.wrapper}>
            <View style={styles.top}>
              <Text numberOfLines={1} style={styles.title}>{title}</Text>
              {itemType === 'trip' &&
                <Text numberOfLines={1} style={styles.subTitle}>
                  {getSubTitle(item)}
                </Text>}
            </View>
            <View style={styles.middle}>
              <Icon
                size={32}
                name="ios-arrow-forward"
                style={styles.titleCaret}
              />
              <Date date={item.startAt || item.startDate} />
            </View>
            <View style={styles.bottom}>
              <TagList align="flex-end" tags={item.categories} />
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
  deleteTrip: PropTypes.func.isRequired,
  deleteAccommodation: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired
};

export default SubItem;
