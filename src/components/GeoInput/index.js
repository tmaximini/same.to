import React, { PropTypes } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAM93ELRZPJKidnLtt-CIO1TPQT_HF5gqY';

const GeoInput = ({ placeholder, onAdressSelect, ...rest }) => (
  <GooglePlacesAutocomplete
    {...rest}
    placeholder={placeholder || 'Search'}
    minLength={2} // minimum length of text to search
    autoFocus={false}
    listViewDisplayed="false" // true/false/undefined
    // fetchDetails
    // renderDescription={(row) => row.terms[0].value} // display street only
    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      console.log(data);
      onAdressSelect(data.description);
    }}
    // getDefaultValue={() => ''}

    // available options: https://developers.google.com/places/web-service/autocomplete
    query={{
      key: GOOGLE_MAPS_API_KEY,
      language: 'de', // language of the results
      // types: '(cities)', // default: 'geocode'
    }}
    styles={{
      description: {
        color: '#fff',
      },
      predefinedPlacesDescription: {
        color: '#fff',
      },
    }}

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
);

GeoInput.propTypes = {
  placeholder: PropTypes.string,
  onAdressSelect: PropTypes.func
};

export default GeoInput;
