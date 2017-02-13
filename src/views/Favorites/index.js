import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';
import ContactList from '../../components/ContactList';
// import PlusButton from '../../components/PlusButton';
// import { share } from '../../utils';

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
      <View style={styles.container}>
        <ContactList
          contacts={favorites}
          refresh={fetchFavorites}
          isRefreshing={isRefreshing}
          contactActions={contactActions}
          {...rest}
        />
      </View>
    );
  }
}
