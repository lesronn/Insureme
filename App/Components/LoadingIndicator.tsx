import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../Config/colors';

interface loadingProps {
  loading?: boolean;
}
const LoadingIndicator = ({loading}: loadingProps) => {
  if (!loading) return null;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.modalBg,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 999999,
      }}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({});
