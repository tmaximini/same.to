import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import InputGroup from '../../components/InputGroup';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import Select from '../../components/Select';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
import { actions as accommodationActions } from '../../redux/modules/editCreateAccommodation';


// TODO: i18n
const overstays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({ value: i, label: `${i} night(s)` }));

@connect(
  state => state.editCreateAccommodation,
  accommodationActions,
)
export default class EditCreateAccommodation extends Component {

  static propTypes = {
    updateAccommodation: PropTypes.func.isRequired,
    setAccommodation: PropTypes.func.isRequired,
    updateRemoteAccommodation: PropTypes.func.isRequired,
    createAccommodation: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    accommodationTypes: PropTypes.array,
    locationString: PropTypes.string,
    accommodation: PropTypes.object,
    eventId: PropTypes.string,
    isNew: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (this.props.isNew) {
      console.log('eventId', this.props.eventId);
      this.props.createAccommodation(item, this.props.eventId);
    } else {
      this.props.updateRemoteAccommodation(item);
    }
  }

  render() {
    const {
      accommodationTypes,
      updateAccommodation,
      toggleCategory,
      accommodation,
    } = this.props;

    const { overnightStays } = accommodation;

    const today = formatDate(new Date());

    return (
      <Form
        buttonText={this.props.isNew ? 'Save' : 'Update'}
        onSubmit={() => this.saveItem(accommodation)}
      >
        <CheckboxList
          label="Accommodation Types"
          items={accommodationTypes}
          onChange={toggleCategory}
          model={accommodation}
        />
        <Input
          placeholder="Name"
          onChangeText={text => updateAccommodation('name', text)}
          icon="bed"
          value={accommodation.name}
        />
        <InputGroup>
          <Datepicker
            placeholder="Start Date"
            minDate={today}
            date={accommodation.startAt || today}
            onChange={date => updateAccommodation('startAt', date)}
            grow
          />
          <Select
            placeholder="Dauer"
            value={overnightStays}
            items={overstays}
            onChange={val => updateAccommodation('overnightStays', val)}
          />
        </InputGroup>
        <HR />
        <OnOffSwitch
          name="Make this accommodation public"
          value={accommodation.isPublic}
          onChange={(val) => updateAccommodation('isPublic', val)}
        />
      </Form>
    );
  }
}



