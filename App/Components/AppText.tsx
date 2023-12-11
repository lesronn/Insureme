import React from 'react';
import {Text, StyleSheet, ViewStyle, TextProps} from 'react-native';
import colors from '../Config/colors';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  color?: keyof typeof colors;
  numberOfLines?: number;
  fontSize?: number;
  fontFamily?:
    | 'Gilroy-Regular'
    | 'Gilroy-Medium'
    | 'Gilroy-Light'
    | 'Gilroy-Heavy'
    | 'Gilroy-Bold'
    | 'Sora-Bold'
    | 'Sora-Medium'
    | 'Sora-Regular'
    | 'Sora-SemiBold';
}

function AppText({
  children,
  color = 'primaryText',
  numberOfLines,
  fontSize = 18,
  // fontWeight = 'normal',
  fontFamily = 'Sora-Regular',
  style,
  ...otherProps
}: AppTextProps) {
  return (
    <Text
      numberOfLines={numberOfLines}
      {...otherProps}
      allowFontScaling={false}
      style={[
        styles.text,
        {
          color: colors[color],
          fontSize: fontSize,
          // fontWeight: fontWeight,
          fontFamily: fontFamily,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {fontSize: 18},
});

export default AppText;
