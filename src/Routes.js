import React from 'react';
import { Navigator, Text, StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Home from './views/Home';
import Login from './views/Login';
import LostPassword from './views/LostPassword';
import EditCreateProfile from './views/EditCreateProfile';
import EditCreateTrip from './views/EditCreateTrip';
import EditCreateAccommodation from './views/EditCreateAccommodation';
import EventDetail from './views/Event';
import EditCreatevent from './views/EditCreateEvent';
// import Splash from './views/Splash';
import { COLORS } from './constants';

const RouterWithRedux = connect()(Router);

const navBarPadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
};

const navTabpadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  paddingBottom: 50, // default height of tabbar
};

const TabIcon = ({ selected, title }) => (
  <Text style={{ color: selected ? 'red' : 'black' }}>
    {title}
  </Text>
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
      key="tabbar"
      tabs
      tabBarStyle={{ backgroundColor: COLORS.DARK_GREY }}
    >
      <Scene
        key="home"
        component={Home}
        title="Home / Feed"
        sceneStyle={navTabpadding}
        icon={TabIcon}
        initial
      />
      <Scene key="tab2" title="Tab #2" icon={TabIcon}>
        <Scene key="tab2_1" component={TabView} title="Tab #2_1" />
        <Scene key="tab2_2" component={TabView} title="Tab #2_2" />
      </Scene>
      <Scene key="tab3" component={TabView} title="Tab #3" icon={TabIcon} />
      <Scene key="tab4" component={TabView} title="Tab #4" icon={TabIcon} />
      <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
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
