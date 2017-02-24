import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View } from 'react-native';
import DPicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, PADDINGS } from '../../constants';

export const DatePicker = ({ date, placeholder, minDate, maxDate, onChange, grow = true }) => (
  <View style={{ flexShrink: 0, flexGrow: (grow ? 1 : 0), flexBasis: 1, flexDirection: 'row', marginBottom: PADDINGS.STANDARD }}>
    <Icon
      name="calendar"
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
        color: COLORS.CYAN,
        zIndex: 10,
        backgroundColor: COLORS.DARK_GREY
      }}
      size={20}
    />
    <DPicker
      style={{ flex: 1, marginBottom: 0 }}
      date={date}
      mode="date"
      showIcon={false}
      placeholder={placeholder || 'select date'}
      format="DD.MM.YYYY"
      minDate={minDate}
      maxDate={maxDate}
      confirmBtnText={I18n.t('confirm')}
      cancelBtnText={I18n.t('cancel')}
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
          fontFamily: 'Montserrat',
        },
        dateText: {
          color: COLORS.WHITE,
          fontSize: 14,
          fontFamily: 'Montserrat',
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

DatePicker.propTypes = {
  date: PropTypes.string,
  placeholder: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  grow: PropTypes.bool,
};

export default DatePicker;
