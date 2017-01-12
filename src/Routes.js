import React from 'react';
import { Navigator, Text, StyleSheet } from 'react-native';
import { Scene, Router, TabBar, Modal } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import Home from './views/Home';
import Login from './views/Login';
import LostPassword from './views/LostPassword';
import EditCreateProfile from './views/EditCreateProfile';
import EditCreateTrip from './views/EditCreateTrip';
import EditCreateAccommodation from './views/EditCreateAccommodation';
import EventDetail from './views/EventDetail';
import NewEvent from './views/NewEvent';
// import Splash from './views/Splash';
import Menu from './components/Menu';
import { COLORS } from './constants';

const navBarPadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
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
  <Drawer
    type="static"
    content={<Menu closeDrawer={() => this.drawer.close()} />}
    openDrawerOffset={100}
    tweenHandler={Drawer.tweenPresets.parallax}
    tapToClose
    ref={ref => this.drawer = ref} // eslint-disable-line
  >
    <Router
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
          key="tab1"
          title="Tab #1"
          icon={TabIcon}
          navigationBarStyle={{ backgroundColor: 'red' }}
          titleStyle={{ color: 'white' }}
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
        key="home"
        component={Home}
        title="Home / Feed"
        sceneStyle={navBarPadding}
        initial
      />

      <Scene
        key="login"
        component={Login}
        title="Login"
        hideNavBar
      />
      <Scene
        key="lostPassword"
        component={LostPassword}
        title="Lost Password"
      />
      <Scene
        key="editProfile"
        component={EditCreateProfile}
        title="Edit Profile"
      />
      <Scene
        key="editAccommodation"
        component={EditCreateAccommodation}
        title="Edit Accommodation"
      />
      <Scene
        key="editTrip"
        component={EditCreateTrip}
        title="Edit Trip"
      />
      <Scene
        key="event"
        component={EventDetail}
        title="Event"
        sceneStyle={navBarPadding}
      />
      <Scene
        key="newEvent"
        component={NewEvent}
        title="New Event"
        sceneStyle={navBarPadding}
      />
    </Router>
  </Drawer>
);

export default Routes;
