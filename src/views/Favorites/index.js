import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import {
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ContactList from '../../components/ContactList';
import Form from '../../layouts/form';
import { actions as contactActions } from '../../redux/modules/contacts';
import styles from './styles';

@connect(
  state => ({
    ...state.contacts,
    ...state.editCreateProfile
  }),
  contactActions,
)
export default class Favorites extends Component {

  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
    fetchFavorites: PropTypes.func.isRequired,
    isRefreshing: PropTypes.bool,
  };

  componentDidMount() {
    this.props.fetchFavorites();
  }

  render() {
    const {
      favorites,
      fetchFavorites,
      isRefreshing,
      ...rest
    } = this.props;

    return (
      <Form
        buttonText={I18n.t('find_like_minded')}
        onSubmit={Actions.searchFavorites}
        buttonProps={{ noResize: true }}
      >
        <View style={styles.container}>
          {favorites && favorites.length ? (
            <ContactList
              noIcons
              contacts={favorites}
              refresh={fetchFavorites}
              isRefreshing={isRefreshing}
              contactActions={contactActions}
              {...rest}
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                {I18n.t('no_favorites_yet')}
              </Text>
            </View>
          )}
        </View>
      </Form>
    );
  }
}
