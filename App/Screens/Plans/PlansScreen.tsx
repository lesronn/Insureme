import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Notification1} from 'iconsax-react-native';
import colors from '../../Config/colors';
import AppText from '../../Components/AppText';
import CustomSwitch from '../../Components/CustomSwitch';
import PlanCard from '../../Components/PlanCard';
import ImageLoader from '../../Components/ImageLoader';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../../Config/AuthContext';

const PlansScreen = ({navigation}: any) => {
  const [swicthContent, setSwitchContent] = useState(1);
  const {setUser, user} = useContext(AuthContext);

  const onSelectSwitch = (value: any) => {
    setSwitchContent(value);
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
      <View style={styles.container}>
        <View style={{marginHorizontal: 15}}>
          <CustomSwitch selectionMode={1} onSelectSwitch={onSelectSwitch} />
          {swicthContent === 1 ? (
            <View style={{paddingTop: 20, paddingHorizontal: 15}}>
              <PlanCard
                headline={'Acacia Life Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />
              <PlanCard
                headline={'Acacia Life Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />

              <PlanCard
                headline={'Acacia Life Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />
              <PlanCard
                headline={'Acacia Life Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />
            </View>
          ) : swicthContent === 2 ? (
            <View style={{paddingTop: 20, paddingHorizontal: 15}}>
              <PlanCard
                headline={'Enterprise Group Third  Party Motor Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />
              <PlanCard
                headline={'Enterprise Group Third  Party Motor Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />

              <PlanCard
                headline={'Enterprise Group Third  Party Motor Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />
              <PlanCard
                headline={'Enterprise Group Third  Party Motor Insurance'}
                time={`12|24|2023`}
                imageUrl={require('../../Assets/bg.png')}
              />
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
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
