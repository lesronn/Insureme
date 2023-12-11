import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import colors from '../Config/colors';

interface ScreenProps {
  children?: React.ReactNode;
  backgroundColor: keyof typeof colors;
}
function Screen({children, backgroundColor}: ScreenProps) {
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors[backgroundColor]}]}>
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default Screen;
