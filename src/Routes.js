import React from 'react';
import { Navigator, Text } from 'react-native';
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

const Routes = () => (
  <Drawer
    type="static"
    content={<Menu closeDrawer={() => this.drawer.close()} />}
    openDrawerOffset={100}
    tweenHandler={Drawer.tweenPresets.parallax}
    tapToClose
    ref={ref => this.drawer = ref} // eslint-disable-line
  >
    <Router>
      <Scene
        key="tabbar"
        tabs
        tabBarStyle={{ backgroundColor: 'white' }}
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
        component={EditProfile}
        title="Edit Profile"
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
