import React from 'react';
import { View, Navigator, Text, StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './views/Home';
import Login from './views/Login';
import LostPassword from './views/LostPassword';
import EditCreateProfile from './views/EditCreateProfile';
import EditCreateTrip from './views/EditCreateTrip';
import EditCreateActivity from './views/EditCreateActivity';
import EditCreateAccommodation from './views/EditCreateAccommodation';
import EventDetail from './views/Event';
import EditCreatevent from './views/EditCreateEvent';
import TabBar from './components/TabBar';
import Splash from './views/Splash';
import { COLORS } from './constants';

const RouterWithRedux = connect()(Router);

const navBarPadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
};

const navTabpadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  paddingBottom: 50, // default height of tabbar
};

const makeTabIcon = (icon) => ({ selected, title }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Icon
      name={icon}
      size={22}
      style={{ color: selected ? COLORS.CYAN : COLORS.WHITE }}
    />
    <Text style={{ color: selected ? COLORS.CYAN : COLORS.WHITE, fontSize: 10 }}>
      {title}
    </Text>
  </View>
);

const TabView = () => (
  <Text>
    TAB VIEW
  </Text>
);

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: COLORS.DARK_GREY,
  },
  navBarTitle: {
    color: COLORS.WHITE
  },
  barButtonTextStyle: {
    color: COLORS.CYAN
  },
  barButtonIconStyle: {
    tintColor: COLORS.CYAN
  },
});


const Routes = () => (
  <RouterWithRedux
    navigationBarStyle={styles.navBar}
    titleStyle={styles.navBarTitle}
    barButtonTextStyle={styles.barButtonTextStyle}
    barButtonIconStyle={styles.barButtonIconStyle}
  >
    <Scene
      key="start"
      component={Splash}
      hideNavBar
      initial
    />
    <Scene
      key="tabbar"
      tabs
      component={TabBar}
    >
      <Scene
        key="home"
        component={Home}
        title="Home"
        sceneStyle={navTabpadding}
        icon={makeTabIcon('home')}
      />
      <Scene key="favorites" component={TabView} title="Favoriten" icon={makeTabIcon('star')} />
      <Scene key="contacts" component={TabView} title="Kontakte" icon={makeTabIcon('user-circle-o')} />
      <Scene key="chats" component={TabView} title="Chats" icon={makeTabIcon('comment')} />
      <Scene key="settings" component={TabView} title="Mehr" icon={makeTabIcon('ellipsis-h')} />
    </Scene>
    <Scene
      key="editCreateProfile"
      component={EditCreateProfile}
      title="New Profile"
    />
    <Scene
      key="editCreateAccommodation"
      sceneStyle={navBarPadding}
      component={EditCreateAccommodation}
      title="New Accommodation"
    />
    <Scene
      key="editCreateActivity"
      sceneStyle={navBarPadding}
      component={EditCreateActivity}
      title="New Activity"
    />
    <Scene
      key="editCreateTrip"
      component={EditCreateTrip}
      sceneStyle={navBarPadding}
      title="New Trip"
    />
    <Scene
      key="event"
      component={EventDetail}
      sceneStyle={navBarPadding}
      title="Event"
      sceneStyle={navBarPadding}
    />
    <Scene
      key="editCreateEvent"
      component={EditCreatevent}
      sceneStyle={navBarPadding}
      title="New Event"
      sceneStyle={navBarPadding}
    />
    <Scene
      key="lostPassword"
      component={LostPassword}
      title="Lost Password"
    />
    <Scene
      key="login"
      component={Login}
      title="Login"
      hideNavBar
    />
  </RouterWithRedux>
);

export default Routes;
