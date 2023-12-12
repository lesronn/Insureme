import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DocumentPickerComponent from '../../Components/DocumentPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePickerComponent from '../../Components/ImagePickerComponent';
import {useToast} from 'react-native-toast-notifications';
import AppButton from '../../Components/AppButton';
const GeneralInsuranceignup = ({navigation}: any) => {
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

  const travelValidationSchema = Yup.object().shape({
    passport: Yup.string().required('Passport is required').label('Passport'),
    tripItinerary: Yup.string()
      .required('Itenary for trip is required')
      .label('Itenary for trip '),
  });

  const homeValidationSchema = Yup.object().shape({
    ownershipProof: Yup.string()
      .required('Proof of Ownership/Tenancy  is required')
      .label('Proof of ownership/Tenancy'),
    propertyValuation: Yup.string()
      .required('Property Valuation is required')
      .label('Property Valuation'),
    riskAssessment: Yup.string()
      .required('Risk Assessment is required')
      .label('Risk Assessment'),
  });

  const travelFormSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (error: any) {
      // Stop the loading state on error
    }
  };

  const homeFormSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (error: any) {
      // Stop the loading state on error
    }
  };
  return (
    <>
      <SubHeader
        middleText={true}
        title="General Insurance Plan  SignUp"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {/* <Formik
          initialValues={{passport: '', tripItinerary: ''}}
          onSubmit={travelFormSubmit}
          validationSchema={travelValidationSchema}>
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            handleBlur,
            setFieldValue,
          }) => (
            <>
              <KeyboardAwareScrollView
                style={{
                  paddingHorizontal: 20,
                  marginBottom: keyboardVisible ? 0 : 100,
                  paddingTop: 20,
                }}
                extraHeight={150}
                enableOnAndroid={true}>
                <ImagePickerComponent
                  label={'Picture of valid Passport'}
                  placeholder={'select or capture Valid Passport'}
                  color={
                    touched.passport && errors.passport
                      ? colors.danger
                      : colors.formBorder
                  }
                  onImagePick={(uri: string) => {
                    setFieldValue('passport', uri);
                  }}
                />
                <View
                  style={{
                    height: 28,
                  }}>
                  {touched.passport && errors.passport && (
                    <Text style={styles.errorText}>{errors.passport}</Text>
                  )}
                </View>

                <DocumentPickerComponent
                  label={'Itinerary of trip'}
                  placeholder={'select Document'}
                  color={
                    touched.tripItinerary && errors.tripItinerary
                      ? colors.danger
                      : colors.formBorder
                  }
                  onDocumentPick={(uri: string) => {
                    setFieldValue('tripItinerary', uri);
                  }}
                />
                <View
                  style={{
                    height: 28,
                  }}>
                  {touched.tripItinerary && errors.tripItinerary && (
                    <Text style={styles.errorText}>{errors.tripItinerary}</Text>
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
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              )}
            </>
          )}
        </Formik> */}

        <Formik
          initialValues={{
            ownershipProof: '',
            propertyValuation: '',
            riskAssessment: '',
          }}
          onSubmit={homeFormSubmit}
          validationSchema={homeValidationSchema}>
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            handleBlur,
            setFieldValue,
          }) => (
            <>
              <KeyboardAwareScrollView
                style={{
                  paddingHorizontal: 20,
                  marginBottom: keyboardVisible ? 0 : 100,
                  paddingTop: 20,
                }}
                extraHeight={150}
                enableOnAndroid={true}>
                <DocumentPickerComponent
                  label={'Proof of Ownership/Tenancy'}
                  placeholder={'Select Document'}
                  color={
                    touched.ownershipProof && errors.ownershipProof
                      ? colors.danger
                      : colors.formBorder
                  }
                  onDocumentPick={(uri: string) => {
                    setFieldValue('ownershipProof', uri);
                  }}
                />
                <View
                  style={{
                    height: 28,
                  }}>
                  {touched.ownershipProof && errors.ownershipProof && (
                    <Text style={styles.errorText}>
                      {errors.ownershipProof}
                    </Text>
                  )}
                </View>

                <DocumentPickerComponent
                  label={'Property valuation'}
                  placeholder={'select Document'}
                  color={
                    touched.propertyValuation && errors.propertyValuation
                      ? colors.danger
                      : colors.formBorder
                  }
                  onDocumentPick={(uri: string) => {
                    setFieldValue('propertyValuation', uri);
                  }}
                />
                <View
                  style={{
                    height: 28,
                  }}>
                  {touched.propertyValuation && errors.propertyValuation && (
                    <Text style={styles.errorText}>
                      {errors.propertyValuation}
                    </Text>
                  )}
                </View>

                <DocumentPickerComponent
                  label={'Risk assessment'}
                  placeholder={'select Document'}
                  color={
                    touched.riskAssessment && errors.riskAssessment
                      ? colors.danger
                      : colors.formBorder
                  }
                  onDocumentPick={(uri: string) => {
                    setFieldValue('riskAssessment', uri);
                  }}
                />
                <View
                  style={{
                    height: 28,
                  }}>
                  {touched.riskAssessment && errors.riskAssessment && (
                    <Text style={styles.errorText}>
                      {errors.riskAssessment}
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
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              )}
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

export default GeneralInsuranceignup;

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
