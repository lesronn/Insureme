import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import AppText from '../../Components/AppText';
import {Notification1} from 'iconsax-react-native';
import GreetingsCard from '../../Components/GreetingsCard';
import FastImage from 'react-native-fast-image';
import Card from '../../Components/Card';
import {AuthContext} from '../../Config/AuthContext';
import ImageLoader from '../../Components/ImageLoader';

interface homeProps {
  navigation?: any;
}
const HomeScreen = ({navigation}: homeProps) => {
  const {setUser, user} = useContext(AuthContext);
  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
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
      <View style={styles.container}>
        <GreetingsCard
          username={user.name}
          profilePress={() => navigation.navigate('Profile')}
          profileImageUrl={{uri: user.profilePicture}}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <View
          style={{
            paddingTop: 30,
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <Card
            title="Life Insurance"
            source={require('../../Assets/life.png')}
            onPress={() => navigation.navigate('LifeInsurance')}
          />
          <Card
            title="Vehicle Insurance"
            source={require('../../Assets/car.png')}
            onPress={() => navigation.navigate('VehicleInsurance')}
          />
        </View>

        <View
          style={{
            paddingTop: 20,
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <Card
            title="Health Insurance"
            source={require('../../Assets/health.png')}
            onPress={() => navigation.navigate('HealthInsurance')}
          />

          <Card
            title="General Insurance"
            source={require('../../Assets/insurance.png')}
            onPress={() => navigation.navigate('GeneralInsurance')}
          />
        </View>
        <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
          <AppText fontSize={15} style={{textAlign: 'center'}}>
            *Estimated Price is subject to change after review
          </AppText>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
    // paddingHorizontal: 20,
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
});
