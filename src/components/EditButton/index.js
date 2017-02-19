import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { COLORS } from '../../constants';

const EditButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ paddingBottom: 5, paddingLeft: 10, paddingRight: 6 }}
  >
    <Icon
      name="dots-three-horizontal"
      color={COLORS.CYAN}
      size={22}
    />
  </TouchableOpacity>
);

EditButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default EditButton;
