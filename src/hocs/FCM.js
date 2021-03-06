import React, { Component } from 'react';
import { Platform } from 'react-native';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm';
import { updateFcmToken } from '../services/api';

export default function (WrappedComponent) {
  return class extends Component {

    constructor() {
      super();
      this.showLocalNotification = this.showLocalNotification.bind(this);
    }

    componentDidMount() {
      console.log('mouting fcm');
      FCM.requestPermissions(); // for iOS

      FCM.getFCMToken().then(token => {
        console.log({ token });
        // store fcm token in your server
        updateFcmToken(token);
      });

      this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        console.log('notif', notif);
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
        if (notif.local_notification) {
          //this is a local notification
          return;
        }
        if (notif.opened_from_tray) {
          //app is open/resumed because user clicked banner
          return;
        }

        if (Platform.OS === 'ios') {
          //optional
          // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
          // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
          // notif._notificationType is available for iOS platfrom
          switch (notif._notificationType) {
            case NotificationType.Remote:
              notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
              break;
            case NotificationType.NotificationResponse:
              notif.finish();
              break;
            case NotificationType.WillPresent:
              notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
              break;
            default:
              break;
          }
        }
        this.showLocalNotification(notif);
      });

      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        console.log('refresh token', token);
        // fcm token may not be available on first load, catch it here
        updateFcmToken(token);
      });

    }


    // FCM.presentLocalNotification({
    //   id: 'UNIQ_ID_STRING',                               // (optional for instant notification)
    //   title: 'My Notification Title',                     // as FCM payload
    //   body: 'My Notification Message',                    // as FCM payload (required)
    //   sound: 'default',                                   // as FCM payload
    //   priority: 'high',                                   // as FCM payload
    //   click_action: 'ACTION',                             // as FCM payload
    //   badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
    //   number: 10,                                         // Android only
    //   ticker: 'My Notification Ticker',                   // Android only
    //   auto_cancel: true,                                  // Android only (default true)
    //   large_icon: 'ic_launcher',                           // Android only
    //   icon: 'ic_launcher',                                // as FCM payload, you can relace this with custom icon you put in mipmap
    //   big_text: 'Show when notification is expanded',     // Android only
    //   sub_text: 'This is a subText',                      // Android only
    //   color: 'red',                                       // Android only
    //   vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
    //   tag: 'some_tag',                                    // Android only
    //   group: 'group',                                     // Android only
    //   my_custom_data: 'my_custom_field_value',             // extra data you want to throw
    //   lights: true,                                       // Android only, LED blinking (default false)
    //   show_in_foreground: true                            // notification when app is in foreground (local & remote)
    // })

    showLocalNotification(notif) {
      const msg = notif.fcm || notif.notification;
      FCM.presentLocalNotification({
        ...notif,
        title: msg.title,
        body: msg.body,
        sound: 'default',
        badge: 1,
        number: 1,
        icon: 'icon',
        large_icon: 'ic_launcher',
        priority: 'high',
        click_action: notif.click_action,
        show_in_foreground: true,
        // local: true
      });
    }

    componentWillUnmount() {
      console.log('unmounting fcm');
      // stop listening for events
      this.notificationListener.remove();
      this.refreshTokenListener.remove();
    }

    render() {
      return (
        <WrappedComponent />
      );
    }
  };
}
