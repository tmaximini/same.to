import React from 'react';
import { View, Navigator, Text, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './views/Home';
import Contacts from './views/Contacts';
import Participants from './views/Participants';
import Favorites from './views/Favorites';
import Login from './views/Login';
import Register from './views/Register';
import EditCreateProfile from './views/EditCreateProfile';
import EditCreateTrip from './views/EditCreateTrip';
import EditCreateActivity from './views/EditCreateActivity';
import EditCreateAccommodation from './views/EditCreateAccommodation';
import EditCreateChat from './views/EditCreateChat';
import EventDetail from './views/Event';
import SearchEvents from './views/SearchEvents';
import SearchFavorites from './views/SearchFavorites';
import EditCreatevent from './views/EditCreateEvent';
import Detail from './views/Detail';
import Profile from './views/Profile';
import TabBar from './components/TabBar';
import Chats from './views/Chats';
import Chat from './views/Chat';
import Splash from './views/Splash';
import Settings from './views/Settings';
import Feedback from './views/Feedback';
import Impressum from './views/Impressum';
import Privacy from './views/Privacy';
import { Onboarding1, Onboarding2, Onboarding3 } from './views/Onboarding';
import { COLORS } from './constants';

const RouterWithRedux = connect()(Router);

const TOP_PADDING = Platform.OS === 'ios'
  ? Navigator.NavigationBar.Styles.General.TotalNavHeight
  : Navigator.NavigationBar.Styles.General.TotalNavHeight - 2;

const navBarPadding = {
  paddingTop: TOP_PADDING
};

const navTabpadding = {
  paddingTop: TOP_PADDING,
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
    style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 5 }}
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
        title={I18n.t('home')}
        sceneStyle={navTabpadding}
        icon={makeTabIcon('home')}
        renderRightButton={makeSearchButton}
      />
      <Scene
        key="favorites"
        component={Favorites}
        title={I18n.t('favorites')}
        icon={makeTabIcon('star')}
        sceneStyle={navTabpadding}
      />
      <Scene
        key="contacts"
        component={Contacts}
        title={I18n.t('contacts')}
        icon={makeTabIcon('user-circle-o', 20)}
        sceneStyle={navTabpadding}
      />
      <Scene
        key="chats"
        component={Chats}
        title={I18n.t('chats')}
        icon={makeTabIcon('comment', 20)}
        sceneStyle={navTabpadding}
      />
      <Scene
        key="settings"
        component={Settings}
        title={I18n.t('more')}
        icon={makeTabIcon('dots-horizontal', 22, true)}
        sceneStyle={navTabpadding}
      />
    </Scene>
    <Scene
      key="editCreateProfile"
      component={EditCreateProfile}
      title={I18n.t('create_profile')}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="editCreateAccommodation"
      sceneStyle={navBarPadding}
      component={EditCreateAccommodation}
      title={I18n.t('new_accommodation')}
    />
    <Scene
      key="editCreateActivity"
      sceneStyle={navBarPadding}
      component={EditCreateActivity}
      title={I18n.t('new_activity')}
    />
    <Scene
      key="editCreateTrip"
      component={EditCreateTrip}
      sceneStyle={navBarPadding}
      title={I18n.t('new_trip')}
    />
    <Scene
      key="editCreateChat"
      component={EditCreateChat}
      sceneStyle={navBarPadding}
      title={I18n.t('new_chat')}
    />
    <Scene
      key="event"
      component={EventDetail}
      sceneStyle={navBarPadding}
      title={I18n.t('event_details')}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="searchEvents"
      component={SearchEvents}
      sceneStyle={navBarPadding}
      title={I18n.t('search_events')}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="searchFavorites"
      component={SearchFavorites}
      sceneStyle={navBarPadding}
      title={I18n.t('search_favorites')}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="trip"
      component={Detail}
      sceneStyle={navBarPadding}
      title={I18n.t('trip_details')}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="accommodation"
      component={Detail}
      sceneStyle={navBarPadding}
      title={I18n.t('housing_details')}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="activity"
      component={Detail}
      sceneStyle={navBarPadding}
      title={I18n.t('activity_details')}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="editCreateEvent"
      component={EditCreatevent}
      sceneStyle={navBarPadding}
      title={I18n.t('new_event')}
    />
    <Scene
      key="chat"
      component={Chat}
      title={I18n.t('chat')}
      sceneStyle={navBarPadding}
      rightButtonTextStyle={cyanText}
    />
    <Scene
      key="profile"
      component={Profile}
      title={I18n.t('profile')}
      sceneStyle={navBarPadding}
      rightButtonTextStyle={cyanText}
    />
    {/*<Scene
      key="lostPassword"
      component={LostPassword}
      title="Lost Password"
    />*/}
    <Scene
      key="login"
      component={Login}
      title={I18n.t('login')}
      navigationBarStyle={styles.navBarLight}
    />
    <Scene
      key="register"
      component={Register}
      title={I18n.t('register')}
      navigationBarStyle={styles.navBarLight}
    />
    <Scene
      key="onboarding1"
      component={Onboarding1}
      title={I18n.t('getting_started')}
      navigationBarStyle={styles.navBarLight}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="onboarding2"
      component={Onboarding2}
      title={I18n.t('getting_started')}
      navigationBarStyle={styles.navBarLight}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="onboarding3"
      component={Onboarding3}
      title={I18n.t('getting_started')}
      navigationBarStyle={styles.navBarLight}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="participants"
      component={Participants}
      title={I18n.t('participants')}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="feedback"
      component={Feedback}
      title={I18n.t('send_feedback')}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="impressum"
      component={Impressum}
      title={I18n.t('impressum')}
      sceneStyle={navBarPadding}
    />
    <Scene
      key="privacy"
      component={Privacy}
      title={I18n.t('privacy')}
      sceneStyle={navBarPadding}
    />
  </RouterWithRedux>
);

export default Routes;
