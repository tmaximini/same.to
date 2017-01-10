import React, { PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import Accommodation from '../Accommodation';
import Trip from '../Trip';
import styles from './styles';


const SubItemList = ({ accommodations, trips }) => (
  <View style={styles.container}>
    <ScrollView>
      {accommodations.map(ac => <Accommodation key={ac.id} {...ac} />)}
      {trips.map(trip => <Trip key={trip.id} {...trip} />)}
    </ScrollView>
  </View>
);

SubItemList.propTypes = {
  trips: PropTypes.array.isRequired,
  accommodations: PropTypes.array.isRequired,
};

export default SubItemList;
