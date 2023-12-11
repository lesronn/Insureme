import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../Config/colors';
import AppText from './AppText';
interface ErrorProps {
  error?: string;
  visible?: boolean;
  style?: any;
}
const FormErrorMessage = ({error, visible, style}: ErrorProps) => {
  if (!visible || !error) return null;
  return (
    <AppText style={[styles.error, style]} fontSize={16}>
      {error}
    </AppText>
  );
};

const styles = StyleSheet.create({
  error: {color: colors.danger},
});
export default FormErrorMessage;
