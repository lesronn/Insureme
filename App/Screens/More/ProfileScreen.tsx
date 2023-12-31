import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import AppButton from '../../Components/AppButton';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '../../Components/AppTextInput';
import PasswordInput from '../../Components/PasswordInput';
import AppPicker from '../../Components/AppPicker';
import AppText from '../../Components/AppText';
import DatePicker from 'react-native-date-picker';
import colors from '../../Config/colors';
import ImageInput from '../../Components/ImageInput';
import {AuthContext} from '../../Config/AuthContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useToast} from 'react-native-toast-notifications';

import AuthStorage from '../../Utils/AuthStorage';
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const ProfileScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const {setUser, user} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(user.dob);
  const [dateError, setDateError] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const currentDate = new Date();
  // Subtract 4 years from the current date
  currentDate.setFullYear(currentDate.getFullYear() - 4);
  const toast = useToast();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Clean up listeners when the component is unmounted
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const genders = ['Male', 'Female'];
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    name: Yup.string().min(3).required('Name is required').label('Name'),
    gender: Yup.string().required().label('Gender'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is invalid')
      .required('Phone number is required')
      .label('Phone'),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      profilePicture: user.profilePicture,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        values.dob = selectedDate;
        if (selectedDate === null || selectedDate === '') {
          setDateError('Date is required');
        } else {
          if (
            values.profilePicture !== user.profilePicture ||
            values.name !== user.name ||
            values.phone !== user.phone ||
            values.gender !== user.gender ||
            values.dob !== user.dob
          ) {
            // Start the loading state
            setLoading(true);

            // Get the UID from the user credential
            const uid = user?.uid;

            // Post additional user data to Firestore
            if (values.profilePicture !== user.profilePicture) {
              const imageRef = storage().ref(`profile_images/${uid}`);
              await imageRef.putFile(values.profilePicture);
              values.profilePicture = await imageRef.getDownloadURL();
            }

            // Post additional user data to Firestore
            await firestore()
              .collection('users')
              .doc(uid)
              .update({
                name: values.name,
                email: values.email,
                phone: values.phone,
                gender: values.gender,
                dob: values.dob,
                profilePicture: values.profilePicture || null,
                // Add other fields as needed
              });
            // Stop the loading state
            const userData = {uid, ...values};

            setUser(userData);
            AuthStorage.storeUserData(userData);
            toast.show('Profile Successfully Updated!.', {
              type: 'success',
              placement: 'bottom',
              duration: 2000,
              animationType: 'slide-in',
            });
            setLoading(false);
            console.log(
              'User signed up and additional data posted to Firestore:',
              userData,
            );
          } else {
            toast.show('No changes were made !.', {
              type: 'normal',
              placement: 'bottom',
              duration: 2000,
              animationType: 'slide-in',
            });
          }
        }
      } catch (error: any) {
        // Stop the loading state on error
        setLoading(false);

        if (error.code === 'auth/network-request-failed') {
          // Handle network error
          toast.show('Network error!.', {
            type: 'custom',
            placement: 'bottom',
            duration: 2000,
            animationType: 'slide-in',
          });
          console.log('Network error:', error.message);
          // You can display a message to the user or handle it in your UI as needed
        } else {
          // Handle other errors
          console.log('Error  updating data to Firestore:', error);
        }
      }
    },
  });
  return (
    <>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        maximumDate={currentDate}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setSelectedDate(
            date
              .toLocaleString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })
              .split('/')
              .join('-'),
          );
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <SubHeader
        middleText={true}
        title="Profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{
            paddingHorizontal: 20,
            marginBottom: keyboardVisible ? 0 : 100,
          }}
          extraHeight={150}
          enableOnAndroid={true}>
          <View style={{marginBottom: 10}}>
            <ImageInput
              imageUri={formik.values.profilePicture}
              onChangeImage={(uri: string) => {
                formik.setFieldValue('profilePicture', uri);
              }}
            />
          </View>
          <AppTextInput
            label="Fullname"
            autoCapitalize="none"
            autoCorrect={false}
            // style={styles.input}
            placeholder="Enter Fullname (Surname First)"
            keyboardType="default"
            color={
              formik.touched.name && formik.errors.name
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('name')}
            onChangeText={formik.handleChange('name')}
            value={formik.values.name}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.name && formik.errors.name && (
              <Text style={styles.errorText}>{formik?.errors?.name}</Text>
            )}
          </View>

          <AppTextInput
            label="Email"
            autoCapitalize="none"
            textContentType="emailAddress"
            autoCorrect={false}
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            placeholder={'Enter your email address'}
            labelText={'primaryContentText'}
            Inputstyle={{backgroundColor: colors.light}}
            editable={false}
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
              height: 28,
            }}>
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.errorText}>{formik?.errors?.email}</Text>
            )}
          </View>

          <AppTextInput
            label="Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            // style={styles.input}
            placeholder="Enter Phone number"
            keyboardType="phone-pad"
            color={
              formik.touched.phone && formik.errors.phone
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('phone')}
            onChangeText={formik.handleChange('phone')}
            value={formik.values.phone}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.phone && formik.errors.phone && (
              <Text style={styles.errorText}>{formik?.errors?.phone}</Text>
            )}
          </View>

          <AppPicker
            selectedItem={formik.values.gender}
            onSelectItem={(item: any) => formik.setFieldValue('gender', item)}
            label="Gender"
            items={genders}
            placeholder="Select your Gender"
            color={
              formik.errors.gender && formik.touched.gender
                ? 'danger'
                : 'formBorder'
            }
          />

          <View
            style={{
              height: 28,
            }}>
            {formik.touched.gender && formik.errors.gender && (
              <Text style={styles.errorText}>{formik?.errors?.gender}</Text>
            )}
          </View>

          <View style={styles.dateContainer}>
            <AppText
              fontSize={18}
              color="medium"
              fontFamily="Sora-Medium"
              style={{paddingBottom: 8}}>
              Date Of Birth{' '}
              <Text style={{color: 'red', fontSize: 18, lineHeight: 18}}>
                *
              </Text>
            </AppText>

            <Pressable
              onPress={() => setOpen(true)}
              style={[
                styles.textinput,
                {
                  borderColor:
                    dateError !== '' && selectedDate === null
                      ? colors.danger
                      : colors.formBorder,
                },
              ]}>
              <AppText
                fontFamily="Sora-Medium"
                fontSize={18}
                color={selectedDate ? 'primaryText' : 'placeholderTextColor'}>
                {selectedDate}
              </AppText>
            </Pressable>

            <View
              style={{
                height: 28,
              }}>
              {dateError !== '' && selectedDate === null ? (
                <Text style={styles.errorText}>{dateError}</Text>
              ) : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
        {!keyboardVisible && (
          <View style={styles.btnContainer}>
            <AppButton
              title={'Update'}
              btnColor="primaryBtn"
              textColor="primaryBtnText"
              style={{marginVertical: 20, zIndex: 999}}
              onPress={formik.handleSubmit}
              loading={loading}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default ProfileScreen;

const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,

    backgroundColor: colors.white,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderTopColor: colors.light,
    borderTopWidth: 2,
  },
  errorText: {
    color: 'red',
    fontFamily: 'Sora-Regular',
    fontSize: 15,
  },
  textinput: {
    borderWidth: 1.5,
    paddingHorizontal: 15,
    fontSize: 18,
    borderRadius: 10,
    width: '100%',
    height: height > 700 ? 58 : height / 13,
    justifyContent: 'center',
  },
});
