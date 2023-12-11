import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoreScreen from '../Screens/More/MoreScreen';
import ProfileScreen from '../Screens/More/ProfileScreen';
import NotificationScreen from '../Screens/Home/NotificationScreen';
import AboutSceen from '../Screens/More/AboutSceen';

const MoreStack = createStackNavigator();
const MoreNavigator = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
        }}
      />

      <MoreStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <MoreStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <MoreStack.Screen
        name="About"
        component={AboutSceen}
        options={{
          headerShown: false,
        }}
      />
    </MoreStack.Navigator>
  );
};

export default MoreNavigator;
