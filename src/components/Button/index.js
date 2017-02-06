import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from './styles';
import { COLORS } from '../../constants';

export default class Button extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    text: PropTypes.string,
    children: PropTypes.element,
    onPress: PropTypes.func.isRequired,
    activeOpacity: PropTypes.number,
    noBorder: PropTypes.bool,
    noBackground: PropTypes.bool,
    textColor: PropTypes.string,
    style: PropTypes.object,
  }

  constructor() {
    super();
    this.onHighlight = this.onHighlight.bind(this);
    this.onUnhighlight = this.onUnhighlight.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  state = {
    active: false,
  };

  onHighlight() {
    this.setState({ active: true });
  }

  onUnhighlight() {
    this.setState({ active: false });
  }

  onPress() {
    if (!this.props.disabled) {
      this.props.onPress();
    }
  }

  render() {
    const colorStyle = {
      color: this.props.textColor || (this.props.disabled ? '#ccc' : '#fff')
    };
    const buttonStyle = {
      borderWidth: this.props.noBorder ? 0 : 1,
      backgroundColor: this.props.noBackground ? 'transparent' : COLORS.CYAN,
    };
    const underlayColor = this.props.disabled ? '#E0F4FF' : '#B8CCD8';
    const disabledStyle = {
      backgroundColor: this.props.disabled ? COLORS.BG_GREY : (this.props.noBackground ? 'transparent' : COLORS.CYAN),
      borderColor: this.props.disabled ? COLORS.DARK_GREY : COLORS.CYAN,
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this.onUnhighlight}
        onPress={this.onPress}
        onShowUnderlay={this.onHighlight}
        style={[styles.button, buttonStyle, disabledStyle, this.props.style]}
        underlayColor={underlayColor}
        activeOpacity={this.props.activeOpacity}
      >
        {this.props.text
          ? <Text style={[styles.buttonText, colorStyle]}>{this.props.text}</Text>
          : this.props.children
        }
      </TouchableHighlight>
    );
  }
}

Button.defaultProps = {
  activeOpacity: 0.5,
  disabled: false
};
