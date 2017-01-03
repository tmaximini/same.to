import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from './views/Home';
import Login from './views/Login';
import LostPassword from './views/LostPassword';
import EditProfile from './views/EditProfile';
import EventDetail from './views/EventDetail';


const Routes = () => (
  <Router hideNavBar name="root">
    <Scene
      key="home"
      component={Home}
      title="Home / Feed"
    />
    <Scene
      key="login"
      component={Login}
      title="Login"
      initial
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
  </Router>
);

export default Routes;
