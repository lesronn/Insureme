import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from '../Screens/Home/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../Screens/More/ProfileScreen';
import NotificationScreen from '../Screens/Home/NotificationScreen';
import HealthInsurance from '../Screens/Home/HealthInsurance';
import LifeInsurance from '../Screens/Home/LifeInsurance';
import GeneralInsurance from '../Screens/Home/GeneralInsurance';
import VehicleInsuranceScreen from '../Screens/Home/VehicleInsuranceScreen';
import InsuranceDetailScreen from '../Screens/Home/InsuranceDetailScreen';
import PlanSignUp from '../Screens/Home/PlanSignUp';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="HealthInsurance"
        component={HealthInsurance}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="LifeInsurance"
        component={LifeInsurance}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="GeneralInsurance"
        component={GeneralInsurance}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="VehicleInsurance"
        component={VehicleInsuranceScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="InsuranceDetail"
        component={InsuranceDetailScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="PlanSignUp"
        component={PlanSignUp}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
