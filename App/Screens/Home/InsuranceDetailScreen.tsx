import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../Config/colors';
import SubHeader from '../../Components/SubHeader';
import AppText from '../../Components/AppText';
import FastImage from 'react-native-fast-image';
import AppButton from '../../Components/AppButton';

const InsuranceDetailScreen = ({navigation}: any) => {
  return (
    <>
      <SubHeader
        middleText={true}
        title="Insurance Detail"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <AppText
          fontFamily="Sora-Bold"
          fontSize={20}
          color="primaryBtn"
          style={{paddingVertical: 10, textAlign: 'center'}}>
          Acacia Life Insurance
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../../Assets/acacia.png')}
            style={{height: 100, width: 135}}
            resizeMode="contain"
          />
          <FastImage
            source={require('../../Assets/acaciastars.png')}
            style={{height: 70, width: 100}}
            resizeMode="contain"
          />
        </View>
        <AppText fontFamily="Sora-Bold">Description</AppText>
        <AppText
          fontFamily="Sora-Medium"
          style={{paddingTop: 10, paddingBottom: 20}}>
          Acacia Life Insurance provides financial protection for your family in
          case of your untimely death.
        </AppText>

        <AppText fontFamily="Sora-Bold">Benefits</AppText>
        <AppText
          fontFamily="Sora-Medium"
          style={{paddingTop: 10, paddingBottom: 20}}>
          Peace of mind knowing your family is cared for, financial security for
          your loved ones, tax-free benefits
        </AppText>

        <AppText fontFamily="Sora-Bold">Features</AppText>
        <AppText fontFamily="Sora-Medium" style={{paddingTop: 10}}>
          • {'  '}Life insurance coverage
        </AppText>
        <AppText fontFamily="Sora-Medium" style={{paddingTop: 10}}>
          • {'  '}Lump sum payment to beneficiaries
        </AppText>

        <AppText fontFamily="Sora-Medium" style={{paddingTop: 10}}>
          • {'  '}Flexible coverage options
        </AppText>

        <AppText fontFamily="Sora-Bold" style={{paddingTop: 20}}>
          Requirements
        </AppText>
        <AppText fontFamily="Sora-Medium" style={{paddingTop: 10}}>
          • {'  '}Valid ID
        </AppText>
        <AppText fontFamily="Sora-Medium" style={{paddingTop: 10}}>
          • {'  '}Proof of income
        </AppText>

        <AppText fontFamily="Sora-Medium" style={{paddingTop: 10}}>
          • {'  '}Medical examination
        </AppText>

        <AppText fontFamily="Sora-Bold" style={{paddingTop: 20}}>
          Estimated Price
        </AppText>
        <AppText
          fontFamily="Sora-Medium"
          style={{paddingTop: 10, paddingBottom: 30}}>
          GH₵ 1000 (Annually)
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
          onPress={() => navigation.navigate('PlanSignUp')}
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
