import React, { Component, PropTypes } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import Tabs from 'react-native-tabs';
import DefaultRenderer from 'react-native-router-flux/src/DefaultRenderer';
import Actions from 'react-native-router-flux/src/Actions';
import TabbedView from 'react-native-router-flux/src/TabbedView';
import { deepestExplicitValueForKey } from 'react-native-router-flux/src/Util';
import { COLORS } from '../../constants';

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
    unmountScenes: PropTypes.bool,
    pressOpacity: PropTypes.number,
    hideOnChildTabs: PropTypes.bool,
  };

  static onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    if (typeof el.props.onPress === 'function') {
      el.props.onPress();
    } else {
      Actions[el.props.name]();
    }
  }

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  render() {
    const state = this.props.navigationState;
    const selected = state.children[state.index];

    const hideTabBar = this.props.unmountScenes ||
      deepestExplicitValueForKey(state, 'hideTabBar') ||
      (this.props.hideOnChildTabs && deepestExplicitValueForKey(selected, 'tabs'));

    const contents = (
      <Tabs
        selectedIconStyle={state.tabBarSelectedItemStyle}
        iconStyle={state.tabBarIconContainerStyle}
        onSelect={TabBar.onSelect}
        {...state}
        selected={selected.sceneKey}
        pressOpacity={0.9}
        style={{ backgroundColor: COLORS.DARK_GREY }}
      >
          {state.children.filter(el => el.icon || this.props.tabIcon).map((el) => {
            const Icon = el.icon || this.props.tabIcon;
            return <Icon {...this.props} {...el} />;
          })}
      </Tabs>
    );
    return (
      <View
        style={{ flex: 1 }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1, backgroundColor: COLORS.DARK_GREY }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
          (state.tabBarBackgroundImage ? (
            <Image source={state.tabBarBackgroundImage}>
              {contents}
            </Image>
          ) : contents)
        }
      </View>
    );
  }

}

export default TabBar;