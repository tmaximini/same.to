import React, { PropTypes } from 'react';
import { View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../constants';

const isIOS = Platform.OS === 'ios';

const styles = {
  container: {
    flexGrow: 1,
  },
  description: {
    color: COLORS.WHITE,
    fontSize: 12,
    paddingLeft: 5,
    padding: 0,
    fontFamily: 'Montserrat',
  },
  predefinedPlacesDescription: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontFamily: 'Montserrat',
  },
  textInputContainer: {
    backgroundColor: COLORS.DARK_GREY,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 5,
    height: 40,
  },
  textInput: {
    color: COLORS.WHITE,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  listView: {
    zIndex: 200,
    position: 'absolute',
    top: 30,
    backgroundColor: COLORS.DARK_GREY,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: COLORS.CYAN,
    zIndex: 99,
    backgroundColor: COLORS.DARK_GREY,
  }
};

export const GOOGLE_MAPS_API_KEY = 'AIzaSyAM93ELRZPJKidnLtt-CIO1TPQT_HF5gqY';

const GeoInput = ({
  placeholder,
  onAdressSelect,
  zIndex,
  grow,
  focus,
  onFocus,
  onBlur,
  ...rest
}) => {
  const containerStyles = {
    zIndex: zIndex || 1,
    marginBottom: 12,
    flexGrow: (grow ? 1 : 0)
  };

  const getStyles = () => {
    if (isIOS) {
      return styles;
    }
    const focusStyles = Object.assign({},
      styles,
      { textInputContainer: {
        ...styles.textInputContainer,
        height: 200,
      }
    });
    return focus
      ? focusStyles
      : styles;
  };

  return (
    <View style={containerStyles}>
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
          onAdressSelect(data.description);
          onBlur();
        }}
        getDefaultValue={() => rest.value}
        textInputProps={{
          onFocus,
          autoCorrect: false,
          underlineColorAndroid: COLORS.DARK_GREY,
        }}
        // available options: https://developers.google.com/places/web-service/autocomplete
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'de', // language of the results
          types: '(regions)', // default: 'geocode'
        }}
        styles={getStyles()}

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
};

GeoInput.propTypes = {
  placeholder: PropTypes.string,
  onAdressSelect: PropTypes.func,
  zIndex: PropTypes.number,
  grow: PropTypes.bool,
  focus: PropTypes.bool,
};

export default GeoInput;
