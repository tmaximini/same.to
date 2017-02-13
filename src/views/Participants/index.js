import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import ContactList from '../../components/ContactList';
// import styles from './styles';

class Participants extends Component {

  static propTypes = {
    members: PropTypes.array.isRequired,
  }

  render() {
    const { members } = this.props;

    return (
      <View>
        <ContactList
          contacts={members}
        />
      </View>
    );
  }
}

export default Participants;
