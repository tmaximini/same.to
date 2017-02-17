import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import ContactList from '../../components/ContactList';
import Form from '../../layouts/form';
import { actions as contactActions } from '../../redux/modules/contacts';
import styles from './styles';

@connect(
  state => state.contacts,
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
        buttonText="Favoriten suchen"
        onPress={() => {}}
      >
        <View style={styles.container}>
          {favorites && favorites.length ? (
            <ContactList
              contacts={favorites}
              refresh={fetchFavorites}
              isRefreshing={isRefreshing}
              contactActions={contactActions}
              {...rest}
            />
          ) : (
            <View style={styles.noItems}>
              <Text style={styles.noItemsText}>
                Du hast derzeit noch keine Favoriten. Favorisiere deine Kontakte oder finde Favoriten mit der Suche.
              </Text>
            </View>
          )}
        </View>
      </Form>
    );
  }
}
