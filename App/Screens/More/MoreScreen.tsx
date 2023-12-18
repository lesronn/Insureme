import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ArchiveTick,
  ArrowRight,
  DeviceMessage,
  Notification1,
  Profile,
  ProfileCircle,
} from 'iconsax-react-native';
import colors from '../../Config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import AppText from '../../Components/AppText';

import ImageLoader from '../../Components/ImageLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import CommonMethods from '../../Utils/CommonMethods';
import VersionCheck from 'react-native-version-check';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../../Config/AuthContext';
import AuthStorage from '../../Utils/AuthStorage';

const MoreScreen = ({navigation}: any) => {
  const [imageModalVisible, setimageModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [downloadMessage, setDownloadMesage] = useState('');
  const {setUser, user} = useContext(AuthContext);

  const [enableNotification, setEnableNotification] = useState<boolean>(true);

  const toast = useToast();
  const ReceiveNotifications = () => {
    // Load the value from AsyncStorage
    AsyncStorage.getItem('NotificationsEnabled')
      .then(value => {
        if (value === null) {
          AsyncStorage.setItem('NotificationsEnabled', JSON.stringify(true));
          setEnableNotification(true);
        }
        if (value !== null) {
          // Parse the stored value and set the checkbox state
          setEnableNotification(JSON.parse(value)); // Parse the stored value as a boolean
        }
      })
      .catch(error => {
        console.log('Error reading from AsyncStorage:', error);
      });
  };

  const handleReceiveNotifications = async () => {
    AsyncStorage.getItem('NotificationsEnabled')
      .then(value => {
        if (value === 'true') {
          CommonMethods.UnSubscribeFromTopic('insuremeSub');
          toast.show('You have  turned off notifications for InsureMe.', {
            type: 'custom',
            placement: 'bottom',
            duration: 2000,
            animationType: 'slide-in',
          });
          AsyncStorage.setItem('NotificationsEnabled', JSON.stringify(false));
          setEnableNotification(false);
        }
        if (value === 'false') {
          CommonMethods.subscribeToTopic('insuremeSub');
          AsyncStorage.setItem('NotificationsEnabled', JSON.stringify(true));
          setEnableNotification(true);
        }
      })
      .catch(error => {
        console.log('Error reading from AsyncStorage:', error);
      });
  };

  useEffect(() => {
    ReceiveNotifications();
  }, []);
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      AuthStorage.removeUserData();
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileContainer}>
          <ImageLoader
            containerStyle={{borderRadius: 8, height: 40, width: 40}}
            source={{
              uri: user.profilePicture,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{height: 40, width: 40, borderRadius: 8}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../../Assets/logosmall.png')} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={styles.actionBtnContainer}>
          <Notification1
            size={30}
            color={colors.primaryText}
            variant="Broken"
          />
        </TouchableOpacity>
      </View>

      {/* <View
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Pressable onPress={openModal}>
            <ImageLoader
              containerStyle={{borderRadius: 20000, height: 100, width: 100}}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
              }}
              style={{height: 100, width: 100, borderRadius: 2000}}
            />
          </Pressable>
          <AppText
            fontFamily="Sora-Medium"
            fontSize={22}
            color="primaryText"
            style={{marginTop: 10}}>
            Gideon Berry
          </AppText>
        </View> */}

      <ScrollView
        style={[styles.container, {backgroundColor: colors.primaryBg}]}>
        {/* PROFILE CARD */}
        <Pressable
          style={[styles.card, {backgroundColor: colors.white}]}
          onPress={() => navigation.navigate('Profile')}>
          <View style={styles.leftSide}>
            <ProfileCircle
              size={30}
              color={colors.primaryText}
              variant="Outline"
            />
            <AppText
              fontFamily="Gilroy-Medium"
              fontSize={18}
              color="primaryText"
              style={{paddingLeft: 12}}>
              Profile
            </AppText>
          </View>
          <View style={styles.rightSide}>
            <ArrowRight size={30} color={colors.primaryText} variant="Broken" />
          </View>
        </Pressable>
        {/*END OF PROFILE CARD */}

        {/* NOTIFICATION CARD */}
        <View style={[styles.card, {backgroundColor: colors.white}]}>
          <View style={styles.leftSide}>
            <Notification1
              size={30}
              color={colors.primaryText}
              variant="Broken"
            />
            <AppText
              fontFamily="Gilroy-Medium"
              fontSize={18}
              color="primaryText"
              style={{paddingLeft: 12}}>
              Receive Notifications
            </AppText>
          </View>
          <View style={styles.rightSide}>
            <Switch
              trackColor={{
                false: colors.switchTrack,
                true: colors.switchTrack,
              }}
              thumbColor={colors.primaryText}
              value={enableNotification}
              onValueChange={handleReceiveNotifications}
            />
          </View>
        </View>
        {/*END OF NOTIFICATION CARD */}

        {/* ABOUT DEVELOPER CARD */}
        <Pressable
          style={[styles.card, {backgroundColor: colors.white}]}
          onPress={() => navigation.navigate('About')}>
          <View style={styles.leftSide}>
            <DeviceMessage
              size={30}
              color={colors.primaryText}
              variant="Outline"
            />
            <AppText
              fontFamily="Gilroy-Medium"
              fontSize={18}
              color="primaryText"
              style={{paddingLeft: 12}}>
              About
            </AppText>
          </View>
          <View style={styles.rightSide}>
            <ArrowRight size={30} color={colors.primaryText} variant="Broken" />
          </View>
        </Pressable>
        {/*END OF ABOUT DEVELOPER CARD */}

        {/* SAVED NEWS CARD */}
        <TouchableOpacity
          onPress={handleLogout}
          style={[
            {
              backgroundColor: colors.primaryBtn,
              marginTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,
              flexDirection: 'row',
              borderRadius: 12,
              marginBottom: 10,
            },
          ]}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.white} />
          ) : (
            <AppText
              fontFamily="Sora-Bold"
              fontSize={18}
              color="white"
              style={{paddingLeft: 12}}>
              Log Out
            </AppText>
          )}
        </TouchableOpacity>
        {/* END OF SAVED NEWS CARD */}
      </ScrollView>
    </>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    height: 59,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: colors.white,
  },
  profileContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnContainer: {
    flex: 1,
    // backgroundColor: 'black',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 99999,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    // left: 20,
    zIndex: 9999,
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  toastMessageContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 100,
    paddingHorizontal: 15,
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 6,
  },
  card: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {},
});
