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
import SuccessModal from '../../Components/SuccessModal';
const LifeInsureanceSignUp = ({navigation, route}: any) => {
  const insuranceDetails = route.params;
  const {user} = useContext(AuthContext);
  // console.log('user', user);
  // console.log('insurance Data', insuranceDetails);

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
    address: Yup.string().required('Address is required').label('Address'),
    occupation: Yup.string()
      .required('Occupation is required')
      .label('Occupation'),
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      occupation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      if (insuranceDetails === null || insuranceDetails === undefined) {
        navigation.navigate('LifeInsurance');
      } else {
        try {
          setLoading(true);
          // Check if the user has already subscribed
          const hasUserSubscribed = await checkUserSubscription(
            user?.uid,
            insuranceDetails.id,
          );

          if (!hasUserSubscribed) {
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
                ...values,
              },
            });
            setLoading(false);
            setSuccessModalVisible(true);
            console.log('User signed up successfully!');
          } else {
            setLoading(false);

            toast.show('You have already subscribed to this policy', {
              type: 'danger',
              placement: 'top',
              duration: 2000,
              animationType: 'slide-in',
            });
            console.log('You have already subscribed to this policy');
          }
        } catch (error: any) {
          setLoading(false);
          console.error('Error during signup:', error);
        }
      }
    },
  });

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
        title={insuranceDetails ? 'Life Insurance Plan  SignUp' : 'Details'}
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
            label="Address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter your Address"
            keyboardType="default"
            color={
              formik.touched.address && formik.errors.address
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('address')}
            onChangeText={formik.handleChange('address')}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.address && formik.errors.address && (
              <Text style={styles.errorText}>{formik.errors.address}</Text>
            )}
          </View>

          <AppTextInput
            label="Occupation"
            autoCapitalize="none"
            autoCorrect={false}
            // style={styles.input}
            placeholder="Enter your Occupation"
            keyboardType="default"
            color={
              formik.touched.occupation && formik.errors.occupation
                ? colors.danger
                : colors.formBorder
            }
            Required={true}
            placeholderTextColor={colors.placeholderTextColor}
            labelText={'primaryContentText'}
            onBlur={formik.handleBlur('occupation')}
            onChangeText={formik.handleChange('occupation')}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.occupation && formik.errors.occupation && (
              <Text style={styles.errorText}>{formik.errors.occupation}</Text>
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

export default LifeInsureanceSignUp;

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
