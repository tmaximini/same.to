import React, { PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
// import Accommodation from '../Accommodation';
// import Trip from '../Trip';
import SubItem from './SubItem';
import { MIXINS } from '../../constants';


const SubItemList = ({
  activities,
  accommodations,
  trips,
  setTrip,
  setAccommodation,
  setActivity,
  ...rest
}) => (
  <View style={MIXINS.container}>
    <ScrollView>
      {accommodations && accommodations.map(ac => (
        <SubItem
          onSelect={setAccommodation}
          itemType={'accommodation'}
          key={ac.id}
          item={ac}
          {...rest}
        />
      ))}
      {trips && trips.map(trip => (
        <SubItem
          onSelect={setTrip}
          itemType={'trip'}
          key={trip.id}
          item={trip}
          {...rest}
        />
      ))}
      {activities && activities.map(activity => (
        <SubItem
          onSelect={setActivity}
          itemType={'activity'}
          key={activity.id}
          item={activity}
          {...rest}
        />
      ))}
    </ScrollView>
  </View>
);

SubItemList.propTypes = {
  trips: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  accommodations: PropTypes.array.isRequired,
  setTrip: PropTypes.func.isRequired,
  setActivity: PropTypes.func.isRequired,
  setAccommodation: PropTypes.func.isRequired,
  setDetail: PropTypes.func.isRequired,
};

export default SubItemList;
