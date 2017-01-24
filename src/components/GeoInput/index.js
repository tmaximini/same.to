import React, { PropTypes } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './styles';


export const GOOGLE_MAPS_API_KEY = 'AIzaSyAM93ELRZPJKidnLtt-CIO1TPQT_HF5gqY';

const GeoInput = ({ placeholder, onAdressSelect, zIndex, ...rest }) => (
  <View style={{ flex: 1, zIndex: zIndex || 1 }}>
    <Icon
      name="globe"
      style={styles.icon}
      size={20}
    />
    <GooglePlacesAutocomplete
      {...rest}
      placeholder={placeholder || 'Search'}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      listViewDisplayed="true" // true/false/undefined
      // fetchDetails
      // renderDescription={(row) => row.terms[0].value} // display street only
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data);
        onAdressSelect(data.description);
      }}
      getDefaultValue={() => rest.value}
      // textInputProps={{
      //   onFocus
      // }}
      // available options: https://developers.google.com/places/web-service/autocomplete
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'de', // language of the results
        // types: '(cities)', // default: 'geocode'
      }}
      styles={styles}

      // Will add a 'Current location' button at the top of the predefined places list
      // currentLocation
      // currentLocationLabel="Current location"
      // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      nearbyPlacesAPI="GooglePlacesSearch"
      // GoogleReverseGeocodingQuery={{
      //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      // }}
      // GooglePlacesSearchQuery={{
      //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      //   rankby: 'distance',
      //   types: 'food',
      // }}

    />
  </View>
);

GeoInput.propTypes = {
  placeholder: PropTypes.string,
  onAdressSelect: PropTypes.func,
  zIndex: PropTypes.number,
};

export default GeoInput;
