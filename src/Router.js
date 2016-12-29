import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Views
import Home from './views/Home';
import Login from './views/Login';
import LostPassword from './views/LostPassword';
import EditProfile from './views/EditProfile';

// redux actions
import { actions as routeActions } from './redux/modules/routes';


@connect(
  state => state,
  dispatch => bindActionCreators(routeActions, dispatch)
)
export default class Router extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired
  }

  handleNavigation = key => this.props.navigate(key);

  renderScene = props => {
    // because we can not push the same key twice on the card stack,
    // we added the index to the key and extract the relevant part here again
    // TODO: probably bad idea to have the same view multiple times on the stack
    const key = props.scene.key.split('_')[1];
    switch (key) {
      case 'home':
        return <Home navigateTo={this.handleNavigation} />;
      case 'login':
        return <Login navigateTo={this.handleNavigation} />;
      case 'lostPassword':
        return <LostPassword navigateTo={this.handleNavigation} />;
      case 'editProfile':
        return <EditProfile navigateTo={this.handleNavigation} />;
      default:
        return null;
    }
  }

  render() {
    const { CardStack } = NavigationExperimental;

    return (
      <CardStack
        direction="horizontal"
        navigationState={this.props.routes}
        renderScene={this.renderScene}
      />
    );
  }
}
