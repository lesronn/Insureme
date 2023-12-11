import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlansScreen from '../Screens/Plans/PlansScreen';
import ProfileScreen from '../Screens/More/ProfileScreen';
import NotificationScreen from '../Screens/Home/NotificationScreen';

const PlanStack = createStackNavigator();
const PlansNavigator = () => {
  return (
    <PlanStack.Navigator>
      <PlanStack.Screen
        name="Plan"
        component={PlansScreen}
        options={{
          headerShown: false,
        }}
      />
      <PlanStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <PlanStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </PlanStack.Navigator>
  );
};

export default PlansNavigator;

const styles = StyleSheet.create({});
