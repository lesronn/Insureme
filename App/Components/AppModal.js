import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// import colors from '../Config/Colors';
import AppText from './AppText';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Config/colors';
const AppModal = ({
  children,
  modalVisible,
  modalClose,
  headerTextDisplay = 'flex',
  subTextDisplay = 'flex',
  headerText,
  subText,
  style,
  closeIcon,
  containerStyle,
  headerStyle,
  modalHeaderTxt,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      presentationStyle="overFullScreen"
      visible={modalVisible}
      statusBarTranslucent={true}>
      <Pressable
        style={[
          styles.modalContainer,
          containerStyle,
          {backgroundColor: colors.modalBg},
        ]}
        onPress={modalClose}>
        {closeIcon && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: '6%',
              right: '0%',
              padding: 15,
            }}
            onPress={closeIcon}>
            <MaterialCommunityIcons name="close" color="white" size={35} />
          </TouchableOpacity>
        )}
        <View
          style={[styles.modalContent, style, {backgroundColor: colors.white}]}>
          {headerText && (
            <View style={headerStyle}>
              <AppText
                fontSize={20}
                color="primaryText"
                style={[
                  styles.modalHeaderText,
                  {display: headerTextDisplay},
                  modalHeaderTxt,
                ]}>
                {headerText}
              </AppText>
            </View>
          )}
          {subText && (
            <AppText
              fontSize={16}
              color="primaryText"
              style={[styles.subText, {display: subTextDisplay}]}>
              {subText}
            </AppText>
          )}
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: '40%',
  },
  modalContent: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeaderText: {
    // fontWeight: '700',
  },
  subText: {
    // fontWeight: '500',
    lineHeight: 25,
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default AppModal;
