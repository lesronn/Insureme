import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import AppText from './AppText';
import FastImage from 'react-native-fast-image';
import {ArchiveTick} from 'iconsax-react-native';
import ImageLoader from './ImageLoader';
import colors from '../Config/colors';

interface cardProps {
  headline: string;
  time?: string;
  imageUrl?: any;
  saved?: boolean;
  onPress?: () => void;
}
const PlanCard: React.FC<cardProps> = ({
  headline,
  time,
  imageUrl,
  saved,
  onPress,
}) => {
  return (
    <Pressable
      style={[styles.card, {backgroundColor: colors.white}]}
      onPress={onPress}>
      <View
        style={{
          borderColor: colors.light,
          borderWidth: 1,
          backgroundColor: colors.white,
          borderRadius: 12,
          height: 90,
          width: 90,
        }}>
        <FastImage
          // containerStyle={{borderRadius: 12}}
          source={{
            uri: imageUrl,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          // source={imageUrl}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <AppText
          fontSize={18}
          fontFamily="Sora-Medium"
          color="primaryText"
          numberOfLines={3}
          style={[styles.headline, {marginLeft: 16}]}>
          {headline}
        </AppText>
        <View style={[styles.timeContainer, {marginLeft: 16}]}>
          <AppText
            fontSize={18}
            fontFamily="Sora-Medium"
            color="grey"
            style={{flex: 1}}>
            {time}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 15,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {lineHeight: 20},
  timeContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  savedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {height: 90, width: 90, borderRadius: 12},
});
export default PlanCard;
