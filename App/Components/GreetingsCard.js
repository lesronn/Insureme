import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from './AppText';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

import colors from '../Config/colors';
import DateFunctions from '../Utils/DateFunctions';
import {Edit, Magicpen} from 'iconsax-react-native';
import ImageLoader from './ImageLoader';

const GreetingsCard = ({username, profileImageUrl, onPress, profilePress}) => {
  return (
    <View style={[styles.lsiGreetingsCard, {backgroundColor: colors.white}]}>
      <Pressable onPress={profilePress}>
        <ImageLoader
          containerStyle={styles.lsiProfileImg}
          source={profileImageUrl}
          style={styles.lsiProfileImg}
          resizeMode="cover"
        />

        {/* <FastImage source={profileImageUrl} style={styles.lsiProfileImg} /> */}
      </Pressable>
      <View style={styles.lsiTextContainer}>
        <AppText
          fontSize={18}
          fontFamily="Sora-Medium"
          color="primaryText"
          style={styles.greetingText}>
          {DateFunctions.getGreeting()}
        </AppText>
        <AppText
          fontSize={18}
          color="primaryText"
          fontFamily="Sora-Medium"
          numberOfLines={1}
          style={styles.userName}>
          {username}
        </AppText>
      </View>
      <>
        <View style={styles.editIcon}>
          <TouchableOpacity onPress={onPress}>
            {/* <MaterialCommunityIcons
              name="pencil"
              color={colors.primaryText}
              size={25}
            /> */}
            <Edit size={30} color={colors.primaryText} variant="Linear" />
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

export default GreetingsCard;

const styles = StyleSheet.create({
  lsiGreetingsCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 15,
  },
  lsiProfileImg: {
    height: 65,
    width: 65,
    borderRadius: 100,
  },
  greetingText: {},
  lsiTextContainer: {
    paddingLeft: 15,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    paddingTop: 5,
  },
  lsiButton: {
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: '30%',
  },
  editIcon: {
    // backgroundColor: 'red',
    alignSelf: 'center',
    // alignItems: 'center',
  },
});
