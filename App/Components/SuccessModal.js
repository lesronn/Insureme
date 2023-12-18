import React, {useState} from 'react';
import {View, Text, Modal, Button, Pressable} from 'react-native';
import AppText from './AppText';
const SuccessModal = ({isVisible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent
      onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000092',
        }}>
        <View
          style={{
            paddingVertical: 35,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderRadius: 15,
            width: '90%',
          }}>
          <AppText
            fontFamily="Sora-Bold"
            style={{textAlign: 'center'}}
            fontSize={25}>
            Your Request Has Been Sent! 🎉 🎉
          </AppText>
          <AppText
            style={{paddingTop: 40, paddingBottom: 20, textAlign: 'center'}}
            fontFamily="Sora-Medium"
            fontSize={20}>
            You will be notified with if your request is approved and a quote
            will be sent to you.
          </AppText>
          <Button title="Close" onPress={onClose} />
        </View>
      </Pressable>
    </Modal>
  );
};
export default SuccessModal;
