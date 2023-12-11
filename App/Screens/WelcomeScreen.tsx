import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppText from '../Components/AppText';
import colors from '../Config/colors';
import AppButton from '../Components/AppButton';
type WelcomProps = {
  navigation?: any;
};
const WelcomeScreen: React.FC<WelcomProps> = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../Assets/bg.png')}
        style={styles.container}>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Image
            source={require('../Assets/welcome.png')}
            style={{
              height: 200,
              width: 200,
              marginTop: '25%',
            }}
          />
        </View>
        <View style={styles.bottomCard}>
          <AppText
            fontFamily="Sora-Medium"
            fontSize={18}
            style={{paddingTop: 20, textAlign: 'center'}}>
            Welcome to InsureMe! Let's start safeguarding what matters most to
            you.
          </AppText>
          <View style={styles.btnContainer}>
            <AppButton
              title="Sign In"
              btnColor="primaryBtn"
              textColor="white"
              onPress={() => navigation.navigate('SignIn')}
            />
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => navigation.navigate('SignUp')}>
              <AppText fontSize={19} fontFamily="Sora-Bold" color="primaryBtn">
                Sign Up
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  outlineBtn: {
    height: 55,
    width: '100%',
    borderWidth: 2,
    borderColor: colors.primaryBtn,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    bottom: 40,
  },
  bottomCard: {
    flex: 1.1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
  },
});
export default WelcomeScreen;
