import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { actions as contactActions } from '../../redux/modules/contacts';
import ContactList from '../../components/ContactList';
// import styles from './styles';

@connect(
  null,
  contactActions,
)
class Participants extends Component {

  static propTypes = {
    members: PropTypes.array.isRequired,
  }

  render() {
    const { members, ...rest } = this.props;

    return (
      <View>
        <ContactList
          contacts={members}
          {...rest}
        />
      </View>
    );
  }
}

export default Participants;
