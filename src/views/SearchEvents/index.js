import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import EventResult from '../../components/EventResult';
import {
  actions as eventActions
} from '../../redux/modules/events';
import styles from './styles';

@connect(
  state => state.events,
  eventActions
)
class SearchEvents extends Component {

  static propTypes = {
    searchResults: PropTypes.array,
    searchEvents: PropTypes.func.isRequired,
    setCurrentEvent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  // componentWillUnmount() {
  //   this.props.resetSearch();
  // }

  render() {
    const { query } = this.state;
    const {
      searchEvents,
      searchResults,
      setCurrentEvent,
    } = this.props;

    return (
      <Form
        onSubmit={Actions.editCreateEvent}
        buttonText={I18n.t('create_event')}
        buttonProps={{ noBackground: true, noResize: true }}
        extraText={I18n.t('event_not_found')}
      >
        <View style={styles.wrapper}>
          <Input
            value={query}
            placeholder={I18n.t('search_events')}
            onChangeText={text => this.setState({ query: text })}
          />
          <Button
            onPress={() => searchEvents(query)}
            text={I18n.t('search')}
            noResize
          />
          <View style={styles.results}>
            {searchResults && searchResults.length > 0 ? (
              searchResults.map(result => (
                <EventResult
                  key={result.id}
                  event={result}
                  setEvent={setCurrentEvent}
                />
              ))
            ) : null}
          </View>
        </View>
      </Form>
    );
  }
}

export default SearchEvents;
