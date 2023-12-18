import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../Config/colors';
import SubHeader from '../../Components/SubHeader';
import AppText from '../../Components/AppText';
import FastImage from 'react-native-fast-image';
import AppButton from '../../Components/AppButton';

const InsuranceDetailScreen = ({navigation, route}: any) => {
  const insuranceData = route.params;
  const formRoute =
    insuranceData.policyType === 'Health'
      ? 'HealthInsuranceSignup'
      : insuranceData.policyType === 'Life'
      ? 'LifeInsureanceSignUp'
      : insuranceData.policyType === 'Vehicle'
      ? 'VehicleInsuranceSignUp'
      : 'GeneralInsuranceSignup';
  console.log(formRoute);

  return (
    <>
      <SubHeader
        middleText={true}
        title={insuranceData?.name ?? 'Insurance Detail'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <AppText
          fontFamily="Sora-Bold"
          fontSize={20}
          color="primaryBtn"
          style={{paddingVertical: 10, textAlign: 'center'}}>
          {insuranceData.name}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={{uri: insuranceData?.imageUrls[0]}}
            style={{height: 100, width: 135}}
            resizeMode="contain"
          />
          <FastImage
            source={{uri: insuranceData?.imageUrls[1]}}
            style={{height: 70, width: 100}}
            resizeMode="contain"
          />
        </View>
        <AppText fontFamily="Sora-Bold">Description</AppText>
        <AppText
          fontFamily="Sora-Medium"
          style={{paddingTop: 10, paddingBottom: 20}}>
          {insuranceData?.description}
        </AppText>
        <AppText fontFamily="Sora-Bold">Benefits</AppText>
        <AppText
          fontFamily="Sora-Medium"
          style={{paddingTop: 10, paddingBottom: 20}}>
          {insuranceData?.benefits}
        </AppText>
        <AppText fontFamily="Sora-Bold">Features</AppText>
        {insuranceData?.features.map((feature: any, index: any) => (
          <AppText
            key={index}
            fontFamily="Sora-Medium"
            style={{paddingTop: 10}}>
            • {'  '}
            {feature}
          </AppText>
        ))}
        <AppText fontFamily="Sora-Bold" style={{paddingTop: 20}}>
          Requirements
        </AppText>
        {insuranceData?.requirements.map((requirement: any, index: any) => (
          <AppText
            key={index}
            fontFamily="Sora-Medium"
            style={{paddingTop: 10}}>
            • {'  '}
            {requirement}
          </AppText>
        ))}

        <AppText fontFamily="Sora-Bold" style={{paddingTop: 20}}>
          Estimated Price
        </AppText>
        <AppText
          fontFamily="Sora-Medium"
          style={{paddingTop: 10, paddingBottom: 30}}>
          {insuranceData.amount}
        </AppText>
      </ScrollView>
      <View
        style={{
          // position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: colors.white,
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderTopWidth: 1,
          borderTopColor: colors.light,
        }}>
        <AppButton
          title={'Sign Up for this Plan'}
          btnColor="primaryBtn"
          textColor="primaryBtnText"
          onPress={() => navigation.navigate(formRoute, insuranceData)}
          // loading={loading}
        />
      </View>
    </>
  );
};

export default InsuranceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
});
