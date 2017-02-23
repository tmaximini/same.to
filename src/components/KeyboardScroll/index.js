import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardScroll = ({ style, children, ...rest }) => (
  <KeyboardAwareScrollView
    contentContainerStyle={[{ flexGrow: 1, flexShrink: 0, justifyContent: 'flex-end' }, style]}
    extraHeight={20}
    extraScrollHeight={20}
    {...rest}
  >
    {children}
  </KeyboardAwareScrollView>
);

export default KeyboardScroll;
