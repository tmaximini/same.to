import React, { PropTypes, Component } from 'react';
import SearchBar from 'react-native-search-bar';
import { COLORS } from '../../constants';

export default class Search extends Component {

  static propTypes = {
    onCancel: PropTypes.func,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  render() {
    const { onSearch, onCancel, onChange } = this.props;

    return (
      <SearchBar
        ref="searchBar"
        textColor={COLORS.WHITE}
        tintColor={COLORS.DARK_GREY}
        barTintColor={COLORS.WHITE}
        textFieldBackgroundColor={COLORS.DARK_GREY}
        placeholder="Search"
        onChangeText={onChange}
        showsCancelButton={this.state.focus}
        onFocus={() => this.setState({ focus: true })}
        onSearchButtonPress={(text) => {
          this.refs.searchBar.unFocus();
          onSearch(text);
        }}
        onCancelButtonPress={() => {
          this.setState({ focus: false });
          this.refs.searchBar.unFocus();
          onCancel();
        }}
      />
    );
  }
}
