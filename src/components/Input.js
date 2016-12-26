import React, { PropTypes } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d73352'
  },
  icon: {
    width: 20,
    height: 20
  }
});


const Input = (props) => {
  const {
    icon,
    ...rest
  } = props;

  return (
    <View style={styles.inputWrap}>
      {icon && (
        <View style={styles.iconWrap}>
          <Image
            source={icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      )}
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  );
};

Input.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default Input;
