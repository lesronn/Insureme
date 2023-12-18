import {View, Text, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
// import CommonMethods from '../utils/CommonMethods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonMethods from '../Utils/CommonMethods';

const NotificationHook = () => {
  const [unreadCount, setUnreadCount] = useState<number>();
  const [notifications, setNotifications] = useState<[] | any>([]);

  const getunreadCount = useCallback(() => {
    //Retrieve the unread notification count and update the state
    CommonMethods.getUnreadNotificationCount().then(count => {
      setUnreadCount(count);
      // console.log(count);
      // console.log('unread NotificationCount', count);
    });
  }, []);

  const markAllNotificationsAsRead = async () => {
    try {
      // Update all notifications in the state to set "opened" to false
      const updatedNotifications = notifications.map((notification: any) => ({
        ...notification,
        opened: true, // Set "opened" to true to mark as read
      }));
      // Update the local storage with the updated notifications
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications),
      );

      const unreadCountAfterUpdate = updatedNotifications.filter(
        (notification: any) => !notification.opened,
      ).length;

      // Store the updated unread notification count in local storage
      await AsyncStorage.setItem(
        'unreadNotificationCount',
        JSON.stringify(unreadCountAfterUpdate),
      );
      setUnreadCount(0);
      // Update the state to reflect the changes
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      // Clear notifications by setting an empty array in the state
      setNotifications([]);
      // Set an empty array as "notifications" in local storage
      await AsyncStorage.setItem('notifications', JSON.stringify([]));

      // Store the updated unread notification count in local storage
      await AsyncStorage.setItem('unreadNotificationCount', JSON.stringify(0));
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };
  const getNotifications = () => {
    // Retrieve stored notifications from local storage
    AsyncStorage.getItem('notifications').then(storedNotifications => {
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
      // console.log(notifications);
    });
  };
  const handleMarkNotificationAsRead = () => {
    Alert.alert(
      'Message',
      'Are you sure you want mark all notifications as read?',
      [
        {text: 'Yes', onPress: () => markAllNotificationsAsRead()},
        {text: 'No', onPress: () => console.log('No Clicked')},
      ],
    );
  };
  const handleClearAllNotifications = () => {
    Alert.alert(
      'Message',
      'Are you sure you want to clear all notifications?',
      [
        {text: 'Yes', onPress: () => clearAllNotifications()},
        {text: 'No', onPress: () => console.log('No Clicked')},
      ],
    );
  };
  return {
    unreadCount,
    setUnreadCount,
    getunreadCount,
    getNotifications,
    notifications,
    handleMarkNotificationAsRead,
    handleClearAllNotifications,
  };
};

export default NotificationHook;
