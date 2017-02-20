import React, { PropTypes, Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, TouchableHighlight } from 'react-native';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


export default class Select extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    items: PropTypes.array,
    placeholder: PropTypes.string,
  }

  constructor() {
    super();
    this.picker = Picker;
  }

  componentWillMount() {
    const { items, value, placeholder, onChange } = this.props;
    const selected = items.filter(item => item.value === value);
    this.picker.init({
      pickerData: items.map(item => item.label),
      pickerTitleText: placeholder,
      pickerCancelBtnText: I18n.t('cancel'),
      pickerConfirmBtnText: I18n.t('confirm'),
      selectedValue: selected,
      onPickerConfirm: () => {
        Picker.hide();
      },
      onPickerCancel: () => {
        Picker.hide();
      },
      onPickerSelect: data => {
        console.log('data', items, data);
        const selection = items.filter(item => item.label === data[0]);
        onChange(selection[0].value);
      }
    });
    this.picker.hide();
  }


  // Picker.hide();

  render() {
    const { items, value, icon } = this.props;
    const selected = items.filter(item => item.value === value);
    return (
      <TouchableHighlight
        style={styles.inputWrap}
        onPress={this.picker.show}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.selected}>{selected[0].label}</Text>
          {icon && (
            <Icon
              name={icon}
              style={styles.icon}
              size={18}
            />
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

Select.propTypes = {

};

Select.defaultProps = {
  onChange: () => {},
  items: [],
  icon: 'sort',
  placeholder: 'select one'
};

