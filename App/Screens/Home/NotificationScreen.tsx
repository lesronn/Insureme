import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';

const NotificationScreen = ({navigation}: any) => {
  return (
    <>
      <SubHeader
        middleText={true}
        title="Notifications"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}></View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
});
