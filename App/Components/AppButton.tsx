import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from './AppText';

import colors from '../Config/colors';

type ButtonProps = {
  textColor: keyof typeof colors;
  title: string;
  btnColor: keyof typeof colors;
  fontSize?: number;
  style?: any;
  onPress?: () => void;
  loading?: boolean;
};
const AppButton = ({
  textColor,
  title,
  btnColor,
  style,
  fontSize = 19,
  onPress,
  loading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          height: 55,
          width: '100%',
          backgroundColor: colors[btnColor],
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          zIndex: 99999,
        },
      ]}
      onPress={onPress}>
      <View>
        {loading ? (
          <ActivityIndicator color={colors.white} size={'large'} />
        ) : (
          <AppText fontSize={fontSize} color={textColor} fontFamily="Sora-Bold">
            {title}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
