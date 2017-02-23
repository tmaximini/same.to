import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Slider, ActivityIndicator } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import Slider from 'react-native-slider';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import ContactList from '../../components/ContactList';
import HR from '../../components/HR';
import GeoInput from '../../components/GeoInput';
import {
  actions as contactActions
} from '../../redux/modules/contacts';
import { COLORS } from '../../constants';
import styles from './styles';

@connect(
  state => ({
    ...state.contacts,
    profile: state.editCreateProfile.profile,
  }),
  contactActions
)
class SearchFavorites extends Component {

  static propTypes = {
    favoritesSearchResults: PropTypes.array,
    searchFavorites: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    favoritesSearchLocation: PropTypes.object,
    profile: PropTypes.object.isRequired,
    isSearching: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = {
      radius: 10,
      geoFocus: false,
    };
  }

  isValid() {
    const { query, interests } = this.state;
    const { favoritesSearchLocation } = this.props;
    return (query && query.length > 2)
      || (interests && interests.length > 3)
      || favoritesSearchLocation.formattedAddress;
  }

  handleSearch() {
    const {
      searchFavorites,
      favoritesSearchLocation,
    } = this.props;
    const { formattedAddress, position } = favoritesSearchLocation;
    searchFavorites({
      ...this.state,
      query: this.state.interests,
      location: formattedAddress,
      lat: position ? position.lat : null,
      lng: position ? position.lng : null,
    });
  }

  render() {
    const { locationString, interests, radius } = this.state;
    const {
      geocodeLocation,
      favoritesSearchLocation,
      favoritesSearchResults,
      profile,
      isSearching,
    } = this.props;

    return (
      <Form
        onSubmit={this.handleSearch}
        buttonText={I18n.t('search')}
        buttonDisabled={!this.isValid()}
        scrollEnabled={false}
      >
        <View style={styles.wrapper}>
          <Input
            value={interests}
            placeholder={I18n.t('interests')}
            onChangeText={text => this.setState({ interests: text })}
          />
          <GeoInput
            focus={this.state.geoFocus}
            onFocus={() => this.setState({ geoFocus: true })}
            onBlur={() => this.setState({ geoFocus: false })}
            placeholder={I18n.t('location')}
            enablePoweredByContainer={false}
            value={locationString || favoritesSearchLocation.formattedAddress}
            onChangeText={text => this.setState({ locationString: text })}
            onAdressSelect={geocodeLocation}
            zIndex={99}
          />
          <Text style={styles.radius}>{I18n.t('radius')}: + {radius} km</Text>
          <View style={styles.sliderWrap}>
            <Slider
              value={radius}
              onValueChange={(value) => this.setState({ radius: value })}
              minimumValue={0}
              maximumValue={100}
              step={5}
              minimumTrackTintColor={COLORS.CYAN}
              thumbTintColor={COLORS.CYAN}
              animateTransitions
            />
          </View>
          {isSearching && <ActivityIndicator color={COLORS.CYAN} animated />}
          {favoritesSearchResults && favoritesSearchResults.length > 0 && (
            <View style={styles.searchResults}>
              <HR />
              <ContactList
                contacts={favoritesSearchResults}
                profile={profile}
              />
            </View>
          )}
        </View>
      </Form>
    );
  }
}

export default SearchFavorites;
