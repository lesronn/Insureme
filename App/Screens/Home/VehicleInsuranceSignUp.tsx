import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import DocumentPickerComponent from '../../Components/DocumentPicker';
import ImageInput from '../../Components/ImageInput';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../../Config/AuthContext';
import AuthStorage from '../../Utils/AuthStorage';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '../../Components/AppTextInput';
import AppButton from '../../Components/AppButton';
import ImagePickerComponent from '../../Components/ImagePickerComponent';
import SuccessModal from '../../Components/SuccessModal';

import RNFS from 'react-native-fs';

const VehicleInsuranceSignUp = ({navigation, route}: any) => {
  const insuranceDetails = route.params;
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const toast = useToast();
  const currentDate = new Date();
  // Subtract 4 years from the current date
  currentDate.setFullYear(currentDate.getFullYear() - 4);
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

  const validationSchema = Yup.object().shape({
    policyType: Yup.string()
      .required('PolicyType is required')
      .label('PolicyType'),
    primaryDriver: Yup.string()
      .required('Primary Driver is required')
      .label('Primary Driver'),
    license: Yup.string()
      .required('Drivers License is required')
      .label('Drivers License '),
    vehicleUsage: Yup.string()
      .required('Vehicle usage is required')
      .label('Vehicle usage'),
    vehiclePrice: Yup.string()
      .required('Price of vehicle is required')
      .label('Price of vehicle'),

    vehicleImage: Yup.string()
      .required('Picture of Vehicle is required')
      .label('Picture of Vehicle of vehicle'),
  });
  const formik = useFormik({
    initialValues: {
      policyType: '',
      primaryDriver: '',
      license: '',
      vehicleUsage: '',
      vehiclePrice: '',
      vehicleImage: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log(values);
      if (insuranceDetails === undefined || insuranceDetails === null) {
        navigation.navigate('VehicleInsurance');
      } else {
        try {
          toast.show('This may take a while ', {
            type: 'normal',
            placement: 'top',
            duration: 2000,
            animationType: 'slide-in',
          });
          setLoading(true);

          const hasUserSubscribed = await checkUserSubscription(
            user?.uid,
            insuranceDetails.id,
          );
          // Check if the user has already subscribed

          if (!hasUserSubscribed) {
            const licenseImageRef = storage().ref(
              `VehicleImages/${
                user.uid +
                insuranceDetails.id +
                new Date().toISOString() +
                'license'
              }`,
            );
            await licenseImageRef.putFile(values.license);
            const licenseDownloadURL = await licenseImageRef.getDownloadURL();

            const vehicleImageRef = storage().ref(
              `VehicleImages/${
                user.uid + insuranceDetails.id + new Date().toISOString()
              }`,
            );
            await vehicleImageRef.putFile(values.vehicleImage);
            const vehicleImageDownloadURL =
              await vehicleImageRef.getDownloadURL();

            // If the user hasn't subscribed, proceed with signup
            const userPolicyRef = firestore().collection('userPolicies').doc();
            await userPolicyRef.set({
              user: {
                ...user,
              },
              policy: {
                ...insuranceDetails,
              },
              status: 'inProgress',
              signedUpAt: new Date().toISOString(),
              ExtraData: {
                policyType: values.policyType,
                primaryDriver: values.primaryDriver,
                license: licenseDownloadURL,
                vehicleUsage: values.vehicleUsage,
                vehiclePrice: values.vehiclePrice,
                vehicleImage: vehicleImageDownloadURL,
              },
            });
            setLoading(false);
            setSuccessModalVisible(true);
            console.log('User signed up successfully!');
          } else {
            setLoading(false);
            toast.show('You have already subscribed to this policy', {
              type: 'normal',
              placement: 'top',
              duration: 2000,
              animationType: 'slide-in',
            });
            console.log('You have already subscribed to this policy');
          }
        } catch (error: any) {
          setLoading(false);
          console.log('Error during signup:', error);
          toast.show('Error during signup', {
            type: 'normal',
            placement: 'top',
            duration: 2000,
            animationType: 'slide-in',
          });
        }
      }
    },
  });

  const uploadDocumentToStorage = async (uri: string) => {
    try {
      // Read file content using react-native-fs
      const content = await RNFS.readFile(uri, 'base64');
      const blob = new Blob([content], {type: 'application/pdf'});

      // Upload blob to Firebase Storage
      const storageRef = storage().ref();
      const fileRef = storageRef.child(
        `documents/${
          user.uid + insuranceDetails.id + new Date().toISOString()
        }`,
      );

      await fileRef.put(blob);

      // Get download URL
      const downloadURL = await fileRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading document to storage:', error);
      throw error;
    }
  };

  const checkUserSubscription = async (userId: any, policyId: any) => {
    const userPolicyRef = firestore().collection('userPolicies');
    const querySnapshot = await userPolicyRef
      .where(`user.uid`, '==', userId)
      .where(`policy.id`, '==', policyId)
      .limit(1)
      .get();

    return !querySnapshot.empty;
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    // Navigate to the root of the app
    navigation.navigate('Home');
  };
  return (
    <>
      <SuccessModal
        isVisible={successModalVisible}
        onClose={handleSuccessModalClose}
      />
      <SubHeader
        middleText={true}
        title={insuranceDetails ? 'Vehicle Insrance Plan  SignUp' : 'Details'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {/* <DocumentPickerComponent
          label={'Select Document'}
          placeholder={'Choose Document'}
          // onDocumentPick={()}
        /> */}
        <KeyboardAwareScrollView
          style={{
            paddingHorizontal: 20,
            marginBottom: keyboardVisible ? 0 : 100,
            paddingTop: 20,
          }}
          extraHeight={150}
          enableOnAndroid={true}>
          <AppTextInput
            label="Policy Type"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter  Policy Type (1st/ 3rd party)"
            keyboardType="default"
            color={
              formik.touched.policyType && formik.errors.policyType
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('policyType')}
            onChangeText={formik.handleChange('policyType')}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.policyType && formik.errors.policyType && (
              <Text style={styles.errorText}>{formik.errors.policyType}</Text>
            )}
          </View>

          <AppTextInput
            label="Primary Driver"
            autoCapitalize="none"
            autoCorrect={false}
            // style={styles.input}
            placeholder="Enter Primary Driver's Name"
            keyboardType="default"
            color={
              formik.touched.primaryDriver && formik.errors.primaryDriver
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('primaryDriver')}
            onChangeText={formik.handleChange('primaryDriver')}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.primaryDriver && formik.errors.primaryDriver && (
              <Text style={styles.errorText}>
                {formik.errors.primaryDriver}
              </Text>
            )}
          </View>

          <ImagePickerComponent
            label={'Picture of Drivers license'}
            placeholder={'select or capture drivers license'}
            color={
              formik.touched.license && formik.errors.license
                ? colors.danger
                : colors.formBorder
            }
            onImagePick={(uri: string) => {
              formik.setFieldValue('license', uri);
            }}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.license && formik.errors.license && (
              <Text style={styles.errorText}>{formik.errors.license}</Text>
            )}
          </View>

          <AppTextInput
            label="Vehicle Usage"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="(Personal / Company)"
            keyboardType="default"
            color={
              formik.touched.vehicleUsage && formik.errors.vehicleUsage
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('vehicleUsage')}
            onChangeText={formik.handleChange('vehicleUsage')}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.vehicleUsage && formik.errors.vehicleUsage && (
              <Text style={styles.errorText}>{formik.errors.vehicleUsage}</Text>
            )}
          </View>

          <AppTextInput
            label="Monetary value of the car at the moment of purchase"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter Amount"
            keyboardType="numeric"
            color={
              formik.touched.vehiclePrice && formik.errors.vehiclePrice
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('vehiclePrice')}
            onChangeText={formik.handleChange('vehiclePrice')}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.vehiclePrice && formik.errors.vehiclePrice && (
              <Text style={styles.errorText}>{formik.errors.vehiclePrice}</Text>
            )}
          </View>

          <ImagePickerComponent
            label={'Picture of Vehicle'}
            placeholder={'select or capture vehicle '}
            color={
              formik.touched.vehicleImage && formik.errors.vehicleImage
                ? colors.danger
                : colors.formBorder
            }
            onImagePick={(uri: string) => {
              formik.setFieldValue('vehicleImage', uri);
            }}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.vehicleImage && formik.errors.vehicleImage && (
              <Text style={styles.errorText}>{formik.errors.vehicleImage}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
        {!keyboardVisible && (
          <View style={styles.btnContainer}>
            <AppButton
              title={'Submit'}
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

export default VehicleInsuranceSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal: 20,
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
});
