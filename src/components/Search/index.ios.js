import React, { PropTypes, Component } from 'react';
import { View } from 'react-native';
import I18n from 'react-native-i18n';
import SearchBar from 'react-native-search-bar';
import MaterialSearchBar from './material-searchbar';
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
      // <SearchBar
      //   ref="searchBar"
      //   textColor={COLORS.WHITE}
      //   tintColor={COLORS.WHITE}
      //   hideBackground={true}
      //   barTintColor={COLORS.WHITE}
      //   textFieldBackgroundColor={COLORS.DARK_GREY}
      //   placeholder={placeholder || I18n.t('search')}
      //   onChangeText={onChange}
      //   showsCancelButton={this.state.focus}
      //   onFocus={() => this.setState({ focus: true })}
      //   onSearchButtonPress={(text) => {
      //     this.refs.searchBar.unFocus();
      //     onSearch(text);
      //   }}
      //   onCancelButtonPress={() => {
      //     this.setState({ focus: false });
      //     this.refs.searchBar.unFocus();
      //     onCancel();
      //   }}
      // />

      <View style={{ padding: 5, backgroundColor: COLORS.BG_GREY }}>
        <MaterialSearchBar
          ref="materialSearchBar"
          onSearchChange={ (text) => {
              onSearch(text);
              this.refs.materialSearchBar.changeText(text)
          }}
          onSubmitEditing={ (text) => {
              this.refs.materialSearchBar.unFocus()
          }}
          height={30}
          onFocus={() => console.log('On Focus')}
          onBlur={onCancel}
          placeholder={I18n.t('search')}
          autoCorrect={false}
          padding={0}
          returnKeyType="search"
          iconColor={COLORS.WHITE}
          textStyle={{ color: '#fff' }}
          inputStyle={{ backgroundColor: 'transparent' }}
        />
      </View>

    );
  }
}
