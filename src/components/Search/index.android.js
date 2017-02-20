import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';
import I18n from 'react-native-i18n';
import SearchBar from 'react-native-material-design-searchbar';
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
    const { onSearch, onCancel } = this.props;

    return (
      <View style={{ padding: 5, backgroundColor: COLORS.BG_GREY }}>
        <SearchBar
          onSearchChange={onSearch}
          height={44}
          onFocus={() => console.log('On Focus')}
          onBlur={onCancel}
          placeholder={I18n.t('search')}
          autoCorrect={false}
          padding={0}
          returnKeyType="search"
          iconColor={COLORS.CYAN}
          textStyle={{ color: '#fff' }}
          inputStyle={{ backgroundColor: COLORS.BG_GREY }}
        />
      </View>
    );

    /*return (
      <SearchBar
        ref="searchBar"
        textColor={COLORS.WHITE}
        tintColor={COLORS.DARK_GREY}
        barTintColor={COLORS.WHITE}
        textFieldBackgroundColor={COLORS.DARK_GREY}
        placeholder={I18n.t('search')}
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
    );*/
  }
}
