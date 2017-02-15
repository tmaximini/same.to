import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import EventResult from './EventResult';
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
  }

  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  render() {
    const { query } = this.state;
    const { searchEvents, searchResults } = this.props;

    return (
      <Form
        onSubmit={Actions.editCreateEvent}
        buttonText="Event erstellen"
        buttonProps={{ noBackground: true }}
        extraText="Du konntest das Event, das du gesucht hast, nicht finden? Erstelle es jetzt und lade deine Freunde ein."
      >
        <View style={styles.wrapper}>
          <Input
            value={query}
            placeholder="Nach Events suchen"
            onChangeText={text => this.setState({ query: text })}
          />
          <Button
            onPress={() => searchEvents(query)}
            text="Suchen"
          />
          <View style={styles.results}>
            {searchResults && searchResults.length > 0 ? (
              searchResults.map(result => (
                <EventResult
                  event={result}
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
