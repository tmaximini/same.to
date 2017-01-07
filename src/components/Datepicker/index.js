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
        format="YYYY-MM-DD"
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(nextDate) => onChange(nextDate)}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0,
            alignSelf: 'stretch',
            alignItems: 'center',
          },
          dateTouchBody: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }
        }}
      />
    );
  }
}
