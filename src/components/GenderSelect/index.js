import React, { PropTypes } from 'react';
import { View, Dimensions } from 'react-native';
import { Switcher, SegmentedControlButton, themeManager } from 'nachos-ui';
import { COLORS, PADDINGS } from '../../constants';

const { width } = Dimensions.get('window');
const buttonTheme = themeManager.getStyle('SegmentedControlButton');
const newButtonTheme = {
  ...buttonTheme,
  BUTTON_FONT_COLOR: COLORS.WHITE,
  BUTTON_BACKGROUND: COLORS.BG_GREY,
  BUTTON_BORDER_COLOR: COLORS.WHITE,
  BUTTON_ICON_COLOR: COLORS.WHITE,
  BUTTON_HEIGHT: 40,
  BUTTON_SELECTED_BACKGROUND: COLORS.CYAN,
  BUTTON_STATE_PRIMARY: COLORS.CYAN,
  BUTTON_SELECTED_BORDER_COLOR: COLORS.CYAN,
  BUTTON_ICON_SIZE: 18,
};
themeManager.setSource('SegmentedControlButton', () => (newButtonTheme));

const GenderSelect = ({ gender, onChange }) => (
  <View
    style={{
      flexGrow: 0,
      paddingHorizontal: width / 4,
      alignItems: 'center',
      marginBottom: PADDINGS.STANDARD
    }}
  >
    <Switcher
      onChange={value => onChange(value)}
      direction="row"
      defaultSelected={gender}
    >
      <SegmentedControlButton
        value="male"
        iconName="md-male"
      />
      <SegmentedControlButton
        value="female"
        iconName="md-female"
      />
      {/*<SegmentedControlButton
        value="transgender"
        iconName="md-transgender"
      />*/}
    </Switcher>
  </View>
);

GenderSelect.propTypes = {
  gender: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default GenderSelect;

