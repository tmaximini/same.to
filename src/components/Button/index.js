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
    smallText: PropTypes.bool,
    text: PropTypes.string,
    children: PropTypes.element,
    onPress: PropTypes.func.isRequired,
    activeOpacity: PropTypes.number,
    noBorder: PropTypes.bool,
    noBackground: PropTypes.bool,
    noResize: PropTypes.bool,
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
    const {
      textColor,
      noBackground,
      noBorder,
      noResize,
      text,
      style,
      smallText,
      activeOpacity,
      disabled,
      children,
    } = this.props;
    const colorStyle = {
      color: textColor || (disabled ? '#ccc' : '#fff')
    };
    const buttonStyle = {
      borderWidth: noBorder ? 0 : 1,
      backgroundColor: noBackground ? 'transparent' : COLORS.CYAN,
    };
    const underlayColor = disabled ? 'transparent' : COLORS.CYAN_OPAQ;
    const disabledStyle = {
      backgroundColor: disabled ? COLORS.BG_GREY : (noBackground ? 'transparent' : COLORS.CYAN),
      borderColor: disabled ? COLORS.DARK_GREY : COLORS.CYAN,
    };
    const textStyle = ((text.length > 14 && !noResize) || smallText) ? { fontSize: 14 } : { fontSize: 18 };
    return (
      <TouchableHighlight
        onHideUnderlay={this.onUnhighlight}
        onPress={this.onPress}
        onShowUnderlay={this.onHighlight}
        style={[styles.button, buttonStyle, disabledStyle, style]}
        underlayColor={underlayColor}
        activeOpacity={activeOpacity}
      >
        {text
          ? <Text style={[styles.buttonText, colorStyle, textStyle]}>{text}</Text>
          : children
        }
      </TouchableHighlight>
    );
  }
}

Button.defaultProps = {
  activeOpacity: 0.5,
  disabled: false
};
