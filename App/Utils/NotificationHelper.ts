import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
} from '@notifee/react-native';
import CommonMethods from './CommonMethods';

const NotificationHelper = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const GetFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    // console.log('FCM TOKEN ', fcmToken);
    if (!fcmToken) {
      console.log('getting Fcm Token');
      await AsyncStorage.setItem('NotificationsEnabled', JSON.stringify(true));
      await AsyncStorage.setItem('notifications', JSON.stringify([]));
      await AsyncStorage.setItem('SavedNews', JSON.stringify([]));
      await AsyncStorage.setItem('unreadNotificationCount', JSON.stringify(0));
      try {
        let fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log(fcmToken, 'NEW FCMToken');
          AsyncStorage.setItem('fcmtoken', fcmToken);
          CommonMethods.subscribeToTopic('insuremeSub');
        }
      } catch (error) {
        console.log(error, 'FcmToken Error');
      }
    } else {
      console.log('token Exists already');
    }
  };

  const NotificationListener = () => {
    const receiver = messaging().onMessage(onNotifeeMessageReceived);
    return receiver;
  };

  const unsubscribe = () => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          notifee.cancelNotification(detail?.notification?.id ?? '');
          break;
        case EventType.PRESS:
          // console.log('Clicked Notification', detail?.notification);
          CommonMethods.markNotificationAsOpened(detail?.notification?.id);
          CommonMethods.handleClickedNotitfaction(detail.notification);
          break;
        default:
          break;
      }
    });
  };

  return {
    requestUserPermission,
    GetFCMToken,
    NotificationListener,
    unsubscribe,
  };
};
export default NotificationHelper;
export const onNotifeeMessageReceived = async (message: any) => {
  // console.log('Notification Message received', message);
  // Increment the badge count
  // await notifee.incrementBadgeCount();
  const payload = {
    message_id: `${message?.messageId}`,
    data: message?.data,
    title: `${message.data.title}`,
    body: `${message.data.body}`,
    photoUrl: message?.data?.image,
  };
  // console.log('Photo Url', JSON.parse(message.data.images));

  NotificationDisplay(payload);
};

export const NotificationDisplay = async (message: any) => {
  // console.log('Displaying Notification ', message);
  try {
    // Retrieve existing notifications from AsyncStorage
    const existingNotifications =
      JSON.parse(await AsyncStorage.getItem('notifications')) || [];
    // Add "opened" field with value "false" to the new notification
    const notificationWithOpened = {
      ...message,
      opened: false,
    };

    // Append the new notification to the existing ones
    const updatedNotifications = [
      notificationWithOpened,
      ...existingNotifications,
    ];
    if (updatedNotifications.length > 30) {
      updatedNotifications.splice(0, updatedNotifications.length - 30);
    }
    // Store the updated notifications in AsyncStorage
    await AsyncStorage.setItem(
      'notifications',
      JSON.stringify(updatedNotifications),
    );
    // Calculate the count of unread notifications after updating
    const unreadCountAfterUpdate = updatedNotifications.filter(
      notification => !notification.opened,
    ).length;

    // Store the updated unread notification count in local storage
    await AsyncStorage.setItem(
      'unreadNotificationCount',
      JSON.stringify(unreadCountAfterUpdate),
    );
    // console.log('Added The opened fiedl to the message', updatedNotifications);
  } catch (error) {
    console.log('Error handling notification:', error);
  }
  const mainChannel = await notifee.createChannel({
    id: 'com.insureme.notifications',
    name: 'Insureme  Channel',
    sound: 'default',
    importance: AndroidImportance.HIGH,
    vibration: true,
    vibrationPattern: [200, 400],
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.displayNotification({
    id: message?.message_id,
    title: message?.title || '',
    body: message?.body || '',
    data: message?.data,
    android: {
      channelId: mainChannel,
      smallIcon: 'ic_small_icon',
      color: '#111122',
      importance: AndroidImportance.HIGH,
      // ...(message?.avatar ? {largeIcon: message?.avatar} : {}),
      sound: 'default',
      visibility: AndroidVisibility.PUBLIC,
      //   vibration:   true,
      //  vibrationPattern: [200, 400],
      style: message?.photoUrl
        ? {
            type: AndroidStyle.BIGPICTURE,
            picture: message?.photoUrl,
          }
        : undefined,
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
      critical: true,
      criticalVolume: 1.0,
      sound: 'default',
      attachments: message?.photoUrl
        ? [
            {
              url: message?.photoUrl,
              thumbnailHidden: false,
            },
          ]
        : [],
    },
  });
};
export async function GetInitialNotification() {
  const initialNotification = await notifee.getInitialNotification();
  if (initialNotification) {
    // console.log('Opening From background State');
    CommonMethods.markNotificationAsOpened(
      initialNotification?.notification?.id,
    );
    CommonMethods.handleClickedNotitfaction(initialNotification.notification);
  }
}

// export async function getAllNotifications() {
//   const displayedNotifications = await notifee.getDisplayedNotifications();

//   console.log(
//     'displayedNotifications: ',
//     JSON.stringify(displayedNotifications),
//   );
//   // find the one for tag
//   // const displayed = displayedNotifications.find(({notification}) => {
//   //   if (notification) {
//   //     console.log('returning all displayed notifications', notification);
//   //   }
//   //   console.log('null');
//   // });
// }
