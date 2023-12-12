import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
const HealthInsuranceSignup = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

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
    validId: Yup.string().required('Valid Id is required').label('Valid Id '),
    medicalhistory: Yup.string()
      .required('Medical History is required')
      .label('Medical History'),
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      validId: '',
      medicalhistory: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        console.log(values);
      } catch (error: any) {
        // Stop the loading state on error
      }
    },
  });
  return (
    <>
      <SubHeader
        middleText={true}
        title="Health Insurance Plan  SignUp"
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

          <ImagePickerComponent
            label={'Picture of Valid Id'}
            placeholder={'select or capture Valid Id'}
            color={
              formik.touched.validId && formik.errors.validId
                ? colors.danger
                : colors.formBorder
            }
            onImagePick={(uri: string) => {
              formik.setFieldValue('validId', uri);
            }}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.validId && formik.errors.validId && (
              <Text style={styles.errorText}>{formik.errors.validId}</Text>
            )}
          </View>
          <DocumentPickerComponent
            label={'Medical History'}
            placeholder={'Choose Document'}
            color={
              formik.touched.medicalhistory && formik.errors.medicalhistory
                ? colors.danger
                : colors.formBorder
            }
            onDocumentPick={(uri: string) => {
              formik.setFieldValue('medicalhistory', uri);
            }}
          />
          <View
            style={{
              height: 28,
            }}>
            {formik.touched.medicalhistory && formik.errors.medicalhistory && (
              <Text style={styles.errorText}>
                {formik.errors.medicalhistory}
              </Text>
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

export default HealthInsuranceSignup;

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
