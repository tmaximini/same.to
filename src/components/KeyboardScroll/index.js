import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardScroll = ({ style, children, ...rest }) => (
  <KeyboardAwareScrollView
    contentContainerStyle={[{ flex: 1, justifyContent: 'flex-end' }, style]}
    {...rest}
  >
    {children}
  </KeyboardAwareScrollView>
);

export default KeyboardScroll;
