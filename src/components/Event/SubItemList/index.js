import React, { PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
// import Accommodation from '../Accommodation';
// import Trip from '../Trip';
import SubItem from '../SubItem';
import styles from './styles';


const SubItemList = ({ accommodations, trips, setTrip, setAccommodation, setDetail }) => (
  <View style={styles.container}>
    <ScrollView>
      {accommodations.map(ac => (
        <SubItem
          onSelect={setAccommodation}
          setDetail={setDetail}
          itemType={'accommodation'}
          key={ac.id}
          item={ac}
        />
      ))}
      {trips.map(trip => (
        <SubItem
          onSelect={setTrip}
          setDetail={setDetail}
          itemType={'trip'}
          key={trip.id}
          item={trip}
        />
      ))}
    </ScrollView>
  </View>
);

SubItemList.propTypes = {
  trips: PropTypes.array.isRequired,
  accommodations: PropTypes.array.isRequired,
  setTrip: PropTypes.func.isRequired,
  setAccommodation: PropTypes.func.isRequired,
  setDetail: PropTypes.func.isRequired,
};

export default SubItemList;
