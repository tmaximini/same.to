import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { formatDate } from '../../utils';
import Form from '../../layouts/form';
import InputGroup from '../../components/InputGroup';
import Input from '../../components/Input';
import GeoInput from '../../components/GeoInput';
import Datepicker from '../../components/Datepicker';
import CheckboxList from '../../components/CheckboxList';
import OnOffSwitch from '../../components/OnOffSwitch';
import HR from '../../components/HR';
import { actions as activityActions } from '../../redux/modules/editCreateActivity';


@connect(
  state => state.editCreateActivity,
  activityActions,
)
export default class EditCreateActivity extends Component {

  static propTypes = {
    updateActivity: PropTypes.func.isRequired,
    setActivity: PropTypes.func.isRequired,
    updateRemoteActivity: PropTypes.func.isRequired,
    createActivity: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    activityTypes: PropTypes.array,
    locationString: PropTypes.string,
    activity: PropTypes.object,
    eventId: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.saveItem = this.saveItem.bind(this);
  }

  saveItem(item) {
    if (item.id) {
      this.props.updateRemoteActivity(item);
    } else {
      this.props.createActivity(item, this.props.eventId);
    }
  }

  render() {
    const {
      activityTypes,
      updateActivity,
      geocodeLocation,
      toggleCategory,
      locationString,
      activity,
    } = this.props;

    const today = formatDate(new Date());

    return (
      <Form
        buttonText={activity.id ? I18n.t('save') : I18n.t('create')}
        onSubmit={() => this.saveItem(activity)}
        buttonDisabled={!activity.startAt || !activity.name}
      >
        <CheckboxList
          label={I18n.t('activities')}
          items={activityTypes}
          onChange={toggleCategory}
          model={activity}
        />
        <Input
          placeholder={I18n.t('name')}
          onChangeText={text => updateActivity('name', text)}
          icon="coffee"
          value={activity.name}
        />
        <Datepicker
          placeholder={I18n.t('start_date')}
          minDate={today}
          date={activity.startAt || today}
          onChange={date => updateActivity('startAt', date)}
          grow={false}
        />
        <GeoInput
          placeholder={I18n.t('location')}
          enablePoweredByContainer={false}
          value={locationString}
          onChangeText={text => updateActivity('locationString', text)}
          onAdressSelect={geocodeLocation}
          zIndex={99}
        />
        <HR />
        <OnOffSwitch
          name={I18n.t('make_activity_public')}
          value={activity.isPublic}
          onChange={(val) => updateActivity('isPublic', val)}
          style={{ marginBottom: 12 }}
        />
      </Form>
    );
  }
}



