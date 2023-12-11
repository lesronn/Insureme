import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import AppTextInput from '../../Components/AppTextInput';
import AppButton from '../../Components/AppButton';
import PasswordInput from '../../Components/PasswordInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../../Config/AuthContext';
import AuthStorage from '../../Utils/AuthStorage';
import Screen from '../../Components/Screen';
interface SigninProps {
  navigation?: any;
}
const SignInScreen: React.FC<SigninProps> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const {setUser} = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        setLoading(true);
        // Firebase authentication to sign in with email and password
        const userCredential = await auth().signInWithEmailAndPassword(
          values.email,
          values.password,
        );
        // Get the UID from the user credential
        const uid = userCredential.user.uid;
        // Fetch user data from Firestore using the UID
        const userDoc = await firestore().collection('users').doc(uid).get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const user = {uid, ...userData};
          // Store user data and UID in local storage
          setUser(user);
          AuthStorage.storeUserData(user);
          console.log('User logged in and data stored locally:', user);
        } else {
          setLoading(false);
          // Handle the case where there is no data for the user in the collection
          toast.show('User Not Found, kindly signup', {
            type: 'custom',
            placement: 'bottom',
            duration: 2000,
            animationType: 'slide-in',
          });
          console.log('User data not found for UID:', uid);
          // You can display a message to the user or handle it in your UI as needed
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.code === 'auth/user-not-found') {
          toast.show('Invalid Username or Password.', {
            type: 'custom',
            placement: 'bottom',
            duration: 2000,
            animationType: 'slide-in',
          });
        } else if (error.code === 'auth/invalid-email') {
          formik.setFieldError('email', 'Invalid email address');
        } else if (error.code === 'auth/wrong-password') {
          formik.setFieldError('password', 'Invalid password');
        } else if (error.code === 'auth/network-request-failed') {
          // Handle network error
          toast.show('Network error!.', {
            type: 'custom',
            placement: 'bottom',
            duration: 2000,
            animationType: 'slide-in',
          });
          console.log('Network error:', error.message);
          // You can display a message to the user or handle it in your UI as needed
        } else if (error.code === 'firestore/unavailable') {
          toast.show('User Not Found', {
            type: 'custom',
            placement: 'bottom',
            duration: 2000,
            animationType: 'slide-in',
          });
          console.log('User data not found for UID:');
        } else {
          // Handle other errors
          console.log('Error signing in:', error.message);
        }
      }
    },
  });
  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Screen backgroundColor="white">
        <SubHeader
          title="Sign In"
          middleText={true}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <KeyboardAwareScrollView extraHeight={150} enableOnAndroid={true}>
            <AppTextInput
              label="Email"
              autoCapitalize="none"
              textContentType="emailAddress"
              autoCorrect={false}
              Required={true}
              placeholderTextColor={colors.placeholderTextColor}
              placeholder={'Enter your email address'}
              labelText={'primaryContentText'}
              color={
                formik.touched.email && formik.errors.email
                  ? colors.danger
                  : colors.formBorder
              }
              keyboardType="email-address"
              onBlur={formik.handleBlur('email')}
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
            />
            <View
              style={{
                height: 25,
              }}>
              {formik.touched.email && formik.errors.email && (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
              )}
            </View>

            <PasswordInput
              color={
                formik.touched.password && formik.errors.password
                  ? colors.danger
                  : colors.formBorder
              }
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
            <View
              style={{
                height: 25,
              }}>
              {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik?.errors?.password}</Text>
              )}
            </View>
            <AppButton
              title={'Sign In'}
              btnColor="primaryBtn"
              textColor="primaryBtnText"
              style={{marginTop: 50}}
              onPress={formik.handleSubmit}
              loading={loading}
            />
          </KeyboardAwareScrollView>
        </View>
      </Screen>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  errorText: {
    color: 'red',

    fontFamily: 'Sora-Regular',
    fontSize: 15,
  },
});
