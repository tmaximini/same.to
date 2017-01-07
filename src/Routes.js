import React from 'react';
import { Navigator } from 'react-native';
import { Scene, Router, TabBar, Modal } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import Home from './views/Home';
import Login from './views/Login';
import LostPassword from './views/LostPassword';
import EditProfile from './views/EditProfile';
import EventDetail from './views/EventDetail';
import NewEvent from './views/NewEvent';
import Splash from './views/Splash';
import Menu from './components/Menu';


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
      sceneStyle={{ paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight }}
    >
      <Scene
        key="home"
        component={Home}
        title="Home / Feed"
        initial
      />
      <Scene
        key="login"
        component={Login}
        title="Login"
      />
      <Scene
        key="lostPassword"
        component={LostPassword}
        title="Lost Password"
      />
      <Scene
        key="editProfile"
        component={EditProfile}
        title="Edit Profile"
      />
      <Scene
        key="event"
        component={EventDetail}
        title="Event"
      />
      <Scene
        key="newEvent"
        component={NewEvent}
        title="New Event"
      />
    </Router>
  </Drawer>
);

export default Routes;
