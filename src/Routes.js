import React from 'react';
import { View, Navigator, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './views/Home';
import Contacts from './views/Contacts';
import Participants from './views/Participants';
import Favorites from './views/Favorites';
import Login from './views/Login';
import Register from './views/Register';
import LostPassword from './views/LostPassword';
import EditCreateProfile from './views/EditCreateProfile';
import EditCreateTrip from './views/EditCreateTrip';
import EditCreateActivity from './views/EditCreateActivity';
import EditCreateAccommodation from './views/EditCreateAccommodation';
import EditCreateChat from './views/EditCreateChat';
import EventDetail from './views/Event';
import SearchEvents from './views/SearchEvents';
import EditCreatevent from './views/EditCreateEvent';
import Detail from './views/Detail';
import Profile from './views/Profile';
import TabBar from './components/TabBar';
import Chats from './views/Chats';
import Chat from './views/Chat';
import Splash from './views/Splash';
import Settings from './views/Settings';
import { Onboarding1, Onboarding2, Onboarding3 } from './views/Onboarding';
import { COLORS } from './constants';

const RouterWithRedux = connect()(Router);

const navBarPadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
};

const navTabpadding = {
  paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
  paddingBottom: 50, // default height of tabbar
};

const cyanText = {
  color: COLORS.CYAN,
  fontFamily: 'Montserrat',
};

const makeTabIcon = (icon, size = 22, material = false) => ({ selected, title }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {material ? (
      <MaterialIcon
        name={icon}
        size={size}
        style={{ color: selected ? COLORS.CYAN : COLORS.WHITE }}
      />
    ) : (
      <Icon
        name={icon}
        size={size}
        style={{ color: selected ? COLORS.CYAN : COLORS.WHITE }}
      />
    )}
    <Text
      style={{
        color: selected ? COLORS.CYAN : COLORS.WHITE,
        fontSize: 10,
        paddingTop: (22 - size) > 0 ? ((22 - size) + 1) : 0,
        fontFamily: 'Montserrat',
      }}
    >
      {title}
    </Text>
  </View>
);

const getSceneStyle = () => ({
  backgroundColor: 'transparent',
});

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: COLORS.DARK_GREY,
    borderBottomWidth: 0,
  },
  navBarLight: {
    backgroundColor: COLORS.BG_GREY,
    borderBottomWidth: 0,
  },
  navBarTitle: {
    color: COLORS.WHITE,
    fontFamily: 'Montserrat',
  },
  barButtonTextStyle: {
    color: COLORS.CYAN
  },
  barButtonIconStyle: {
    tintColor: COLORS.CYAN
  },
});

const makeSearchButton = () => (
  <TouchableHighlight
    onPress={Actions.searchEvents}
    style={{ justifyContent: 'center', alignItems: 'center', marginTop: 2, marginRight: 5 }}
    underlayColor="transparent"
    activeOpacity={0.6}
  >
    <Icon name="search" size={20} color={COLORS.CYAN} />
  </TouchableHighlight>
);


const Routes = () => (
  <RouterWithRedux
    navigationBarStyle={styles.navBar}
    getSceneStyle={getSceneStyle}
    titleStyle={styles.navBarTitle}
    barButtonTextStyle={styles.barButtonTextStyle}
    barButtonIconStyle={styles.barButtonIconStyle}
  >
    <Scene
      key="start"
      component={Splash}
      onLeft={undefined}
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
        renderRightButton={makeSearchButton}
      />
      <Scene
        key="favorites"
        component={Favorites}
        title="Favoriten"
        icon={makeTabIcon('star')}
        sceneStyle={navTabpadding}
      />
      <Scene
        key="contacts"
        component={Contacts}
        title="Kontakte"
        icon={makeTabIcon('user-circle-o', 20)}
        sceneStyle={navTabpadding}
      />
      <Scene
        key="chats"
        component={Chats}
        title="Chats"
        icon={makeTabIcon('comment', 20)}
        sceneStyle={navTabpadding}
      />
      <Scene
        key="settings"
        component={Settings}
        title="Mehr"
        icon={makeTabIcon('dots-horizontal', 22, true)}
        sceneStyle={navTabpadding}
      />
    </Scene>
    <Scene
      key="editCreateProfile"
      component={EditCreateProfile}
      title="Create Profile"
      sceneStyle={navBarPadding}
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
      key="editCreateChat"
      component={EditCreateChat}
      sceneStyle={navBarPadding}
      title="New Chat"
    />
    <Scene
      key="event"
      component={EventDetail}
      sceneStyle={navBarPadding}
      title="Event Details"
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="searchEvents"
      component={SearchEvents}
      sceneStyle={navBarPadding}
      title="Search Events"
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="trip"
      component={Detail}
      sceneStyle={navBarPadding}
      title="Trip Details"
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="accommodation"
      component={Detail}
      sceneStyle={navBarPadding}
      title="Accommodation Details"
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="activity"
      component={Detail}
      sceneStyle={navBarPadding}
      title="Activity Details"
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="editCreateEvent"
      component={EditCreatevent}
      sceneStyle={navBarPadding}
      title="New Event"
    />
    <Scene
      key="chat"
      component={Chat}
      title="Chat"
      sceneStyle={navBarPadding}
      rightButtonTextStyle={cyanText}
      onRight={() => Actions.editCreateChat({ title: 'Edit Conversation' })}
      rightTitle="edit"
    />
    <Scene
      key="profile"
      component={Profile}
      title="Profile"
      sceneStyle={navBarPadding}
      rightButtonTextStyle={cyanText}
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
      navigationBarStyle={styles.navBarLight}
    />
    <Scene
      key="register"
      component={Register}
      title="Register"
      navigationBarStyle={styles.navBarLight}
    />
    <Scene
      key="onboarding1"
      component={Onboarding1}
      title="Erste Schritte"
      navigationBarStyle={styles.navBarLight}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="onboarding2"
      component={Onboarding2}
      title="Erste Schritte"
      navigationBarStyle={styles.navBarLight}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="onboarding3"
      component={Onboarding3}
      title="Erste Schritte"
      navigationBarStyle={styles.navBarLight}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="participants"
      component={Participants}
      title="All Participants"
      sceneStyle={navBarPadding}
    />
  </RouterWithRedux>
);

export default Routes;
