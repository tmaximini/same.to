import React, { PropTypes } from 'react';
import {
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  wholeSearchBar: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  searchBox:{
    flex: 1,
    backgroundColor: COLORS.DARK_GREY,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'cyan',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchBarInput: {
    flex: 1,
    fontWeight: 'normal',
    color: '#fff',
    backgroundColor: COLORS.DARK_GREY,
    borderRadius: 5,
  },
  cancelText: {
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.WHITE,
  },
});

export default class SearchBar extends React.Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
    autoCorrect: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onSearchChange: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    padding: PropTypes.number,
    inputStyle: PropTypes.object,
    iconCloseName: PropTypes.string,
    iconSearchName: PropTypes.string,
    iconBackName: PropTypes.string,
    placeholderColor: PropTypes.string,
    iconColor: PropTypes.string,
    textStyle: PropTypes.object
  }

  static defaultProps = {
    onSearchChange: () => {},
    onEndEditing: () => {},
    onSubmitEditing: () => {},
    inputStyle: {},
    iconCloseName: "md-close",
    iconSearchName: "md-search",
    iconBackName: "md-arrow-back",
    placeholder: "Search...",
    returnKeyType: "search",
    padding: 5,
    placeholderColor: "#bdbdbd",
    iconColor: "#737373",
    textStyle: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      isOnFocus: false,
    };
    this.state = {
      currentText: '',
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClose = this._onClose.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _onClose() {
    this._textInput.setNativeProps({ text: '' });
    this.props.onSearchChange('');

    if(!this.state.isOnFocus){
      this.setState({ isOnFocus: false });
    }

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _onFocus() {
    this.setState({ isOnFocus: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _onBlur() {
    // this.setState({ isOnFocus: false });
    // if (this.props.onBlur) {
    //   this.props.onBlur();
    // }
    this._dismissKeyboard();
  }

  _dismissKeyboard () {
    dismissKeyboard()
  }

  unFocus(){
    this.setState({ isOnFocus: false });
  }

  changeText(text){
    this.setState({ currentText: text });
  }

  _keyboardDidShow () {
    // console.log('Keyboard Shown');
  }

  _keyboardDidHide () {
    // console.log('Keyboard hidden');
    if(this.state.currentText.length == 0){
      this.setState({ isOnFocus: false });
    }
  }

  render() {
    const {
      height,
      autoCorrect,
      returnKeyType,
      onSearchChange,
      placeholder,
      padding,
      inputStyle,
      iconColor,
      iconBackName,
      iconSearchName,
      iconCloseName,
      placeholderColor,
      textStyle
    } = this.props;

    let { iconSize } = this.props

    iconSize = typeof iconSize !== 'undefined' ? iconSize : height * 0.5

    return (
      <View style={styles.wholeSearchBar}>
        <View
          onStartShouldSetResponder={this._dismissKeyboard}
          style={[
            styles.searchBox,
            {padding: padding }]}>
          <View
            style={
              [
                styles.searchBar,
                {
                  height: height + 10,
                  paddingLeft: height * 0.25,
                },
                inputStyle
              ]
            }
          >
            {this.state.isOnFocus ?

                <Icon
                  name={iconSearchName} size={height * 0.5}
                  color={iconColor}
                />
            :
              <Icon
                name={iconSearchName} size={height * 0.5}
                color={iconColor}
              />
            }
            <TextInput
              autoCorrect={autoCorrect === true}
              ref={(c) => (this._textInput = c)}
              returnKeyType={returnKeyType}
              onFocus={this._onFocus}
              onBlur={this._onBlur}
              onChangeText={onSearchChange}
              onEndEditing={this.props.onEndEditing}
              onSubmitEditing={this.props.onSubmitEditing}
              placeholder={placeholder}
              placeholderTextColor={placeholderColor}
              underlineColorAndroid="transparent"
              style={
                [styles.searchBarInput,
                  {
                    paddingLeft: height * 0.3,
                    fontSize: height * 0.5,
                  },
                  textStyle
                ]
              }
            />
            { (this.state.isOnFocus) ?
              <TouchableOpacity onPress={this._onClose}>
                <Icon
                  style={{paddingRight: height * 0.5 }}
                  name={iconCloseName} size={iconSize}
                  color={iconColor}
                />
              </TouchableOpacity>
            : null
            }
          </View>
        </View>

        {
          (this.state.isOnFocus) ?
            <TouchableOpacity onPress={() => {
              this._dismissKeyboard();
              this._onClose();
              this.props.onBlur();
              this.setState({ isOnFocus: false });
            }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          :
            null
        }

      </View>
    );
  }
}
