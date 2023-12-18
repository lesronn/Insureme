import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AppText from './AppText';
import FastImage from 'react-native-fast-image';
import ImageLoader from './ImageLoader';
// import colors from '../config/colors';
import {Clock} from 'iconsax-react-native';
import colors from '../Config/colors';

// const colors = ThemeConfig[ThemeConfig.CURRENT_THEME];
interface NotificationCardProps {
  uri?: string;
  heading?: string;
  dateTime?: string;
  onPress?: () => void;
  opened?: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  uri,
  heading,
  dateTime,
  onPress,
  opened,
}) => {
  return (
    <Pressable
      style={[styles.card, {backgroundColor: colors.white}]}
      onPress={onPress}>
      {/* <ImageLoader
        containerStyle={{borderRadius: 8, alignSelf: 'center'}}
        source={{
          uri: uri,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.cardImage}
        resizeMode="cover"
      /> */}
      <View style={styles.textContainer}>
        <AppText
          fontSize={18}
          fontFamily="Gilroy-Bold"
          color={opened ? 'grey' : 'primaryText'}
          style={{lineHeight: 20}}>
          {heading}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Clock variant="Linear" color={colors.grey} size={20} />
          <AppText
            fontSize={17}
            fontFamily="Gilroy-Bold"
            color="grey"
            style={{paddingLeft: 7}}>
            {dateTime}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,

    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardImage: {
    height: 65,
    width: 65,
    borderRadius: 8,
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
});
