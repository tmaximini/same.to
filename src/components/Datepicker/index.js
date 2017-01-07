import React, { Component, PropTypes } from 'react';
import DPicker from 'react-native-datepicker';

export default class DatePicker extends Component {

  static propTypes = {
    date: PropTypes.string,
    placeholder: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const {
      date,
      onChange,
      placeholder,
      minDate,
      maxDate,
    } = this.props;

    return (
      <DPicker
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder={placeholder || 'select date'}
        format="DD.MM.YYYY"
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(nextDate) => onChange(nextDate)}
      />
    );
  }
}
