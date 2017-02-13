import React, { PropTypes } from 'react';
import SearchBar from 'react-native-search-bar';
import { COLORS } from '../../constants';

const Search = ({ onChange, onSearch, onCancel }) => (
  <SearchBar
    textColor={COLORS.WHITE}
    tintColor={COLORS.WHITE}
    barTintColor={COLORS.WHITE}
    textFieldBackgroundColor={COLORS.DARK_GREY}
    placeholder="Search"
    onChangeText={onChange}
    onSearchButtonPress={onSearch}
    onCancelButtonPress={onCancel}
  />
);

Search.propTypes = {
  onCancel: PropTypes.func,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
};

export default Search;
