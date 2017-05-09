import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import I18n from 'react-native-i18n';
import Location from '../../components/Location';
import TagList from '../../components/TagList';
import Date from '../../components/Date';
import OnOffSwitch from '../../components/OnOffSwitch';
import styles from './styles';

const eventFallback = require('../../assets/Fallback_Event.png');
const activityFallback = require('../../assets/Fallback_Activity.png');

const getEventImage = event => {
  if (
    event && event.image && event.image.thumbs && event.image.thumbs['960x640']
  ) {
    return { uri: event.image.thumbs['960x640'] };
  }
  // otherwise use fallbacks
  return event.type === 'event' ? eventFallback : activityFallback;
};

const EventHeader = ({ event, renderTitle, onToggle, participates }) => (
  <Image style={styles.bgImage} source={getEventImage(event)}>
    <View style={styles.header}>
      <View style={{ flex: 1.5, alignItems: 'flex-start' }}>
        {event.categories && <TagList tags={event.categories} />}
      </View>
      <View style={{ flex: 1 }}>
        {renderTitle
          ? renderTitle()
          : <Text numberOfLines={1} style={styles.title}>
              {event.name}
            </Text>}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignSelf: 'stretch',
          alignItems: 'flex-end',
          paddingTop: 12
        }}
      >
        {event.location && <Location location={event.location} />}
        <View style={styles.overnight}>
          <Date date={event.startAt} />
          {event.overnightStays &&
            <Text style={styles.overnightStays}>
              {I18n.t('overnight_stays_count', { count: event.overnightStays })}
            </Text>}
        </View>

        <View style={styles.topRight}>
          <OnOffSwitch value={participates} onChange={onToggle} />
          <Text style={styles.participateText}>
            {I18n.t('taking_part')}
          </Text>
        </View>
      </View>
    </View>
  </Image>
);

EventHeader.propTypes = {
  event: PropTypes.object.isRequired,
  renderTitle: PropTypes.func,
  participates: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
};

export default EventHeader;
