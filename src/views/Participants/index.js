import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { actions as contactActions } from '../../redux/modules/contacts';
import ContactList from '../../components/ContactList';
import Search from '../../components/Search';
// import styles from './styles';

@connect(
  null,
  contactActions,
)
class Participants extends Component {

  static propTypes = {
    members: PropTypes.array.isRequired,
    header: PropTypes.element,
  }

  constructor(props) {
    super();
    const { members } = props;
    this.state = {
      members
    };
    this.filterResults = this.filterResults.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      members: nextProps.members
    });
  }

  filterResults(query) {
    console.log('query', query);
    const { members } = this.props;
    const q = query.toLowerCase();
    this.setState({
      members: _.filter(members, item =>
        (item.firstName && item.firstName.toLowerCase().includes(q)) ||
        (item.lastName && item.lastName.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q))
      )
    });
  }

  render() {
    const { header, ...rest } = this.props;
    const { members } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {header && <header />}
        <Search
          onCancel={() => this.setState({ members: this.props.members })}
          onSearch={text => this.filterResults(text)}
          onChange={text => this.filterResults(text)}
        />
        <ContactList
          contacts={members}
          style={{ padding: 12 }}
          {...rest}
        />
      </View>
    );
  }
}

export default Participants;
