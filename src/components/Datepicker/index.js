import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import DPicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants';

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
      <View style={{ flex: 1, flexDirection: 'row', maxHeight: 60 }}>
        <Icon
          name="calendar"
          style={{ position: 'absolute', right: 10, top: 10, color: COLORS.CYAN, zIndex: 10 }}
          size={20}
        />
        <DPicker
          style={{ flex: 1 }}
          date={date}
          mode="date"
          showIcon={false}
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
              marginLeft: 0,
            },
            dateInput: {
              flex: 1,
              padding: 15,
              backgroundColor: COLORS.DARK_GREY,
              borderRadius: 5,
              borderWidth: 0,
              alignItems: 'flex-start',
            },
            placeholderText: {
              color: '#999',
              fontSize: 14,
            },
            dateText: {
              color: COLORS.WHITE,
              fontSize: 14,
            },
            dateTouchBody: {
              justifyContent: 'center',
              flex: 1,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              flexDirection: 'row'
            }
          }}
        />
      </View>
    );
  }
}
