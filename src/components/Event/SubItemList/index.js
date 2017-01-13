import React, { PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
// import Accommodation from '../Accommodation';
// import Trip from '../Trip';
import SubItem from '../SubItem';
import styles from './styles';


const SubItemList = ({ accommodations, trips }) => (
  <View style={styles.container}>
    <ScrollView>
      {accommodations.map(ac => <SubItem itemType={'accommodation'} key={ac.id} item={ac} />)}
      {trips.map(trip => <SubItem itemType={'trip'} key={trip.id} item={trip} />)}
    </ScrollView>
  </View>
);

SubItemList.propTypes = {
  trips: PropTypes.array.isRequired,
  accommodations: PropTypes.array.isRequired,
};

export default SubItemList;
