import React from 'react';
import navigation from './NavigationService';

import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleClickedNotitfaction = (notification: any) => {
  // console.log('Notification CLicked ', notification.data);
  let {id, createdAt, detail, images, category, body} = notification.data;
  images = JSON.parse(images);
  // console.log(id, createdAt, detail, images, category, body);
  navigation.navigate('NewsPreview', {
    newsData: {heading: body, images, createdAt, detail, category, id},
  });
};

const subscribeToTopic = (topic: string) => {
  console.log(topic);
  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log('Subscribed to topic! ' + topic))
    .catch(error => {
      console.log(error);
    });
};

const UnSubscribeFromTopic = (topic: string) => {
  console.log(topic);
  messaging()
    .unsubscribeFromTopic(topic)
    .then(() => console.log('Unsubscribed to topic!' + topic))
    .catch(error => {
      console.log(error);
    });
};

const markNotificationAsOpened = async (notificationId: any) => {
  // Retrieve the stored notifications from local storage
  const storedNotifications = JSON.parse(
    await AsyncStorage.getItem('notifications'),
  );
  // Find the notification with the specified ID
  const updatedNotifications = storedNotifications.map((notification: any) => {
    if (notification.message_id === notificationId) {
      notification.opened = true; // Update the existing "opened" field
    }
    return notification;
  });

  // Calculate the count of unread notifications after updating
  const unreadCountAfterUpdate = updatedNotifications.filter(
    (notification: any) => !notification.opened,
  ).length;

  // Store the updated unread notification count in local storage
  await AsyncStorage.setItem(
    'unreadNotificationCount',
    JSON.stringify(unreadCountAfterUpdate),
  );
  // Update the local storage with the updated notifications
  AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
};

const getUnreadNotificationCount = async () => {
  try {
    const unreadCount = await AsyncStorage.getItem('unreadNotificationCount');
    if (unreadCount !== null) {
      return parseInt(unreadCount);
    }
    return 0; // Default to 0 if the count is not found
  } catch (error) {
    console.error('Error retrieving unread notification count:', error);
    return 0; // Handle errors by returning 0
  }
};
export default {
  handleClickedNotitfaction,
  subscribeToTopic,
  UnSubscribeFromTopic,
  markNotificationAsOpened,
  getUnreadNotificationCount,
};
