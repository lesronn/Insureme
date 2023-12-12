import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import WelcomeScreen from './App/Screens/WelcomeScreen';
import SignInScreen from './App/Screens/Auth/SignInScreen';
import colors from './App/Config/colors';
import AuthNavigator from './App/Navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import NavigationTheme from './App/Config/NavigationTheme';
import SignUpScreen from './App/Screens/Auth/SignUpScreen';
import TabsNavigator from './App/Navigators/TabNavigator';
import {navigationRef} from './App/Utils/NavigationService';
import NotificationHelper, {
  GetInitialNotification,
} from './App/Utils/NotificationHelper';
import AuthStorage from './App/Utils/AuthStorage';
import {AuthContext} from './App/Config/AuthContext';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import VehicleInsuranceSignUp from './App/Screens/Home/VehicleInsuranceSignUp';
import HealthInsuranceSignup from './App/Screens/Home/HealthInsuranceSignup';
import GeneralInsurance from './App/Screens/Home/GeneralInsurance';
import GeneralInsuranceignup from './App/Screens/Home/GeneralInsuranceignup';

const App = () => {
  const [user, setUser] = useState();
  const {
    NotificationListener,
    unsubscribe,
    requestUserPermission,
    GetFCMToken,
  } = NotificationHelper();

  const restoreUserData = async () => {
    const userData = await AuthStorage.getUserData();
    if (!userData) {
      GetFCMToken();
    } else {
      setUser(JSON.parse(userData).user);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      GetInitialNotification();
    }, 2000);
    restoreUserData();
  }, []);
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    unsubscribe();
    // AuthStorage.removeUserData();
  }, []);

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthContext.Provider value={{user, setUser}}>
          <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
            {user ? <TabsNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
