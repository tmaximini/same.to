import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Text,
  Picker,
  Button
} from 'native-base';
// import Input from '../../components/Input';
// import Button from '../../components/Button';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';

import { actions as editCreateEventActions } from '../../redux/modules/editCreateEvent';
import { formatDate } from '../../utils';
import styles from './styles';

const Item = Picker.Item;

@connect(
  state => ({
    newEvent: state.editCreateEvent.newEvent,
    eventTypes: state.editCreateEvent.types,
  }),
  editCreateEventActions,
)
export default class NewEvent extends Component {

  static propTypes = {
    newEvent: PropTypes.object,
    eventTypes: PropTypes.arrayOf(PropTypes.string),
    updateNewEvent: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
  }

  render() {
    const {
      updateNewEvent,
      newEvent,
      createEvent,
      eventTypes,
      geocodeNewLocation,
    } = this.props;

    const {
      name,
      locationString,
      startAt,
      endAt,
      type,
      description,
    } = newEvent;

    const today = formatDate(new Date());

    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel
                  label="Event Name"
                  placeholder="What?"
                  value={name}
                  onChangeText={(text) => updateNewEvent('name', text)}
                />
              </InputGroup>
            </ListItem>
          </List>
          <GeoInput
            placeholder="Where?"
            enablePoweredByContainer={false}
            value={locationString}
            onChangeText={(text) => updateNewEvent('locationString', text)}
            onAdressSelect={geocodeNewLocation}
          />
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel
                  label="Description"
                  multiline
                  // numberOfLines={4}
                  placeholder="some info"
                  value={description}
                  onChangeText={(text) => updateNewEvent('description', text)}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>Event Type</Text>
              <Picker
                iosHeader="Event Type"
                mode="dropdown"
                selectedValue={type}
                onValueChange={(val) => updateNewEvent('type', val)}
              >
                {eventTypes.map(et => (
                  <Item
                    label={et}
                    value={et}
                    key={et}
                  />
                ))}
              </Picker>
            </ListItem>
          </List>
          <View>
            <View style={styles.inputRow}>
              <Datepicker
                placeholder="Start Date"
                minDate={today}
                date={startAt || today}
                onChange={(date) => updateNewEvent('startAt', date)}
              />
            </View>
            <View style={styles.inputRow}>
              <Datepicker
                placeholder="End Date"
                date={endAt || today}
                minDate={startAt || today}
                onChange={(date) => updateNewEvent('endAt', date)}
              />
            </View>
          </View>
          <Button
            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
            onPress={() => createEvent(newEvent)}
          >
              Create
          </Button>
        </Content>
      </Container>
    );
  }
}

