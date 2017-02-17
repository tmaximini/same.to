import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import Location from '../../components/Location';
import TagList from '../../components/TagList';
import Date from '../../components/Date';
import OnOffSwitch from '../../components/OnOffSwitch';
import styles from './styles';

const EventHeader = ({ event, renderTitle, onToggle, participates, background }) => (
  <Image
    style={styles.bgImage}
    source={background}
  >
    <View style={styles.header}>
      <View style={{ flex: 2, alignItems: 'flex-start' }}>
        {event.categories && (
          <TagList
            tags={event.categories}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        {renderTitle ? renderTitle() : (
          <Text numberOfLines={1} style={styles.title}>
            {event.name}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'stretch', alignItems: 'flex-end', paddingTop: 12 }}>
        {event.location && (
          <Location
            location={event.location}
          />
        )}
        <View style={styles.overnight}>
          <Date
            date={event.startAt}
          />
          {event.overnightStays && (
            <Text style={styles.overnightStays}>
              {event.overnightStays} Übernachtungen
            </Text>
          )}
        </View>

        <View style={styles.topRight}>
          <OnOffSwitch
            value={participates}
            onChange={onToggle}
          />
          <Text style={styles.participateText}>
            Ich nehme teil
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
  onToggle: PropTypes.func.isRequired,
};

export default EventHeader;
