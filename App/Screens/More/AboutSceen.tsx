import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import AppText from '../../Components/AppText';

const AboutSceen = ({navigation}: any) => {
  return (
    <>
      <SubHeader
        middleText={true}
        title="About"
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <AppText
          style={{textAlign: 'justify', paddingVertical: 20, lineHeight: 32}}>
          {`InsureMe is a centralised insurance policy software that enables you(our cherished client) to view insurance policies from multiple insurance companies and determine which one gives more value-for-money, which is cheaper and which is popularly sought after and sign up for an insurance plan based on what is important to you.\n\nThe interface is quite simple and easy to use. We hope you find what you’re looking for. `}
        </AppText>
        <AppText
          fontFamily="Sora-Bold"
          style={{textAlign: 'center', paddingTop: 30}}>
          Thank you for using Insure
          <AppText fontFamily="Sora-Bold" color="primaryBtn">
            M
          </AppText>
          e!
        </AppText>
      </ScrollView>
    </>
  );
};

export default AboutSceen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
});
