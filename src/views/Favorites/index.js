import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import {
  View,
  Text,
  NetInfo,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ContactList from '../../components/ContactList';
import Button from '../../components/Button';
import { actions as contactActions } from '../../redux/modules/contacts';
import styles from './styles';

@connect(
  state => ({
    profile: state.editCreateProfile.profile,
    ...state.contacts,
  }),
  contactActions,
)
export default class Favorites extends Component {

  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
    fetchFavorites: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool,
    profile: PropTypes.object,
  };

  constructor() {
    super();
    this.onConnectivityChange = this.onConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.fetchFavorites();
      }
    });
    NetInfo.isConnected.addEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.onConnectivityChange
    );
  }

  onConnectivityChange(connected) {
    if (connected) {
      this.props.fetchFavorites();
    }
  }

  render() {
    const {
      favorites,
      fetchFavorites,
      ...rest
    } = this.props;

    return (
      <View
        style={styles.container}
      >
        <View style={styles.wrapper}>
          {favorites && favorites.length ? (
            <ContactList
              {...rest}
              contacts={favorites}
              refresh={fetchFavorites}
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                {I18n.t('no_favorites_yet')}
              </Text>
            </View>
          )}
        </View>
        <Button
          onPress={Actions.searchFavorites}
          text={I18n.t('find_like_minded')}
          noResize
        />
      </View>
    );
  }
}
