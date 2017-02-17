import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
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
const makeOverstays = () => {
  const arr = [];
  for (let i = 1; i < 32; i++) {
    arr.push({ value: i, label: `${i} night(s)` });
  }
  return arr;
};

const overstays = makeOverstays();

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
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (item.id) {
      this.props.updateRemoteAccommodation(item);
    } else {
      this.props.createAccommodation(item, this.props.eventId);
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
        buttonText={accommodation.id ? I18n.t('save') : I18n.t('create')}
        onSubmit={() => this.saveItem(accommodation)}
      >
        <CheckboxList
          label="Accommodation Types"
          items={accommodationTypes}
          onChange={toggleCategory}
          model={accommodation}
        />
        <Input
          placeholder={I18n.t('name')}
          onChangeText={text => updateAccommodation('name', text)}
          icon="bed"
          value={accommodation.name}
        />
        <InputGroup>
          <Datepicker
            placeholder={I18n.t('start')}
            minDate={today}
            date={accommodation.startAt || today}
            onChange={date => updateAccommodation('startAt', date)}
            grow
          />
          <Select
            placeholder={I18n.t('overnight_stays')}
            value={overnightStays}
            items={overstays}
            onChange={val => updateAccommodation('overnightStays', val)}
          />
        </InputGroup>
        <HR />
        <OnOffSwitch
          name={I18n.t('make_accommodation_public')}
          value={accommodation.isPublic}
          onChange={(val) => updateAccommodation('isPublic', val)}
        />
      </Form>
    );
  }
}



