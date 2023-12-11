/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import CommonMethods from './App/Utils/CommonMethods';
import {onNotifeeMessageReceived} from './App/Utils/NotificationHelper';

messaging().setBackgroundMessageHandler(onNotifeeMessageReceived);

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.DISMISSED:
      notifee.cancelNotification(detail.notification.id);
      break;
    case EventType.PRESS:
      console.log('background Message Handled SuccessFully');
      // await notifee.decrementBadgeCount();
      CommonMethods.handleClickedNotitfaction(detail.notification);
      break;
    default:
      break;
  }
});
AppRegistry.registerComponent(appName, () => App);
