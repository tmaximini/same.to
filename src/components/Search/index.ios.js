import React, { PropTypes, Component } from 'react';
import I18n from 'react-native-i18n';
import SearchBar from 'react-native-search-bar';
import { COLORS } from '../../constants';

export default class Search extends Component {

  static propTypes = {
    onCancel: PropTypes.func,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  render() {
    const { onSearch, onCancel, onChange, placeholder } = this.props;

    return (
      <SearchBar
        ref="searchBar"
        textColor={COLORS.WHITE}
        tintColor={COLORS.DARK_GREY}
        barTintColor={COLORS.WHITE}
        textFieldBackgroundColor={COLORS.DARK_GREY}
        placeholder={placeholder || I18n.t('search')}
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
