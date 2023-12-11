import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../Config/colors';
import FastImage from 'react-native-fast-image';
import AppText from './AppText';

type cardProps = {
  source: any;
  title: string;
  onPress?: () => void;
};
const Card = ({source, title, onPress}: cardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.white,
        width: '48%',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 25,
      }}>
      <FastImage
        source={source}
        style={{
          height: 70,
          width: 70,
          marginBottom: 10,
          alignSelf: 'center',
        }}
      />
      <AppText
        style={{textAlign: 'center'}}
        fontFamily="Sora-Medium"
        color="primaryText"
        fontSize={22}>
        {title}
      </AppText>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({});
