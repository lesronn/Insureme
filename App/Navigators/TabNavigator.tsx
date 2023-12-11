import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Homenavigator from './HomeNavigator';

import {
  Home,
  Microphone,
  ArchiveTick,
  Category,
  ArchiveBook,
} from 'iconsax-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import colors from '../Config/colors';
import HomeNavigator from './HomeNavigator';
import MoreNavigator from './MoreNavigator';
import PlansNavigator from './PlansNavigator';
import {requestPermissions} from '../Utils/Permissions';
const Tab = createBottomTabNavigator();
const TabsNavigator = () => {
  async function handlePermissions() {
    const permissionsGranted = await requestPermissions();
    if (permissionsGranted) {
      console.log('All permissions granted');
    } else {
      console.log('Some permissions were not granted');
    }
  }
  useEffect(() => {
    handlePermissions();
  }, []);

  return (
    <>
      <SafeAreaView
        edges={['bottom', 'left', 'right', 'top']}
        style={{flex: 1, backgroundColor: colors.white}}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.tabBarActive,
            tabBarInactiveTintColor: colors.tabBarInactive,
            tabBarAllowFontScaling: false,
            tabBarHideOnKeyboard: true,
          }}>
          <Tab.Screen
            name="home"
            component={HomeNavigator}
            options={({route}) => ({
              headerShown: false,
              tabBarIconStyle: {
                transform: [{translateY: 2}],
              },
              tabBarIcon: ({focused, size, color}) => (
                <Home
                  size={size}
                  color={color}
                  variant={focused ? 'Bold' : 'Linear'}
                />
              ),
              tabBarStyle: {
                display: getRoutName(route),
                backgroundColor: colors.white,
              },
              tabBarLabelStyle: {
                display: 'none',
              },
            })}
          />

          <Tab.Screen
            name="plans"
            component={PlansNavigator}
            options={({route}) => ({
              headerShown: false,
              tabBarIconStyle: {
                transform: [{translateY: 2}],
              },
              tabBarIcon: ({size, color, focused}) => (
                <ArchiveBook
                  size={size}
                  color={color}
                  variant={focused ? 'Bold' : 'Broken'}
                />
              ),
              tabBarStyle: {
                display: getRoutName(route),
                backgroundColor: colors.white,
              },
              tabBarLabelStyle: {
                display: 'none',
              },
            })}
          />

          <Tab.Screen
            name="more"
            component={MoreNavigator}
            options={({route}) => ({
              headerShown: false,
              tabBarIconStyle: {
                transform: [{translateY: 2}],
              },
              tabBarIcon: ({size, color, focused}) => (
                <Category
                  size={size}
                  color={color}
                  variant={focused ? 'Bold' : 'Broken'}
                />
              ),
              tabBarStyle: {
                display: getRoutName(route),
                backgroundColor: colors.white,
              },
              tabBarLabelStyle: {
                display: 'none',
              },
            })}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({});

const excludedRoutes = [
  'Notification',
  'Profile',
  'About',
  'Profile',
  'VehicleInsurance',
  'LifeInsurance',
  'HealthInsurance',
  'GeneralInsurance',
  'InsuranceDetail',
  'PlanSignUp',
];

const getRoutName = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routeName && excludedRoutes.some(route => routeName.includes(route))) {
    return 'none';
  }
};
