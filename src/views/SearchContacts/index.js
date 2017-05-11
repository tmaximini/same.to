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
import { actions as contactActions } from '../../redux/modules/contacts';
import { COLORS } from '../../constants';
import styles from './styles';

@connect(
  state => ({
    ...state.contacts,
    profile: state.editCreateProfile.profile
  }),
  contactActions
)
class SearchContacts extends Component {
  static propTypes = {
    contactSearchResults: PropTypes.array,
    searchContacts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    isSearching: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = {
      query: ''
    };
  }

  isValid() {
    const { query } = this.state;

    return query && query.length > 2;
  }

  handleSearch() {
    const { query } = this.state;

    return this.props.searchContacts(query);
  }

  render() {
    const { query } = this.state;
    const { contactSearchResults, profile, isSearching, ...rest } = this.props;

    console.log(contactSearchResults);

    return (
      <Form
        onSubmit={this.handleSearch}
        buttonText={I18n.t('search')}
        buttonDisabled={!this.isValid()}
        scrollEnabled={false}
      >
        <View style={styles.wrapper}>
          <Input
            value={query}
            placeholder={I18n.t('search_contacts_text')}
            onChangeText={text => this.setState({ query: text })}
          />
          {isSearching && <ActivityIndicator color={COLORS.CYAN} animated />}
          {contactSearchResults &&
            contactSearchResults.length > 0 &&
            <View style={styles.searchResults}>
              <HR />
              <ContactList
                {...rest}
                contacts={contactSearchResults.filter(
                  item => item.id !== profile.id
                )}
                profile={profile}
              />
            </View>}
        </View>
      </Form>
    );
  }
}

export default SearchContacts;
