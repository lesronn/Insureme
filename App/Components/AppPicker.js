import {
  Dimensions,
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppText from './AppText';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Config/colors';

const AppPicker = ({
  label,
  placeholder,
  onSelectItem,
  selectedItem,
  items,
  color,
  inputWidth = '100%',
  PaddingHorizontal = 15,
  modalHeight = '20%',
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <AppText
          fontSize={18}
          fontFamily="Sora-Medium"
          color={'medium'}
          style={[styles.label, {paddingBottom: 8}]}>
          {label}{' '}
          <Text style={{color: 'red', fontSize: 18, lineHeight: 18}}>*</Text>
        </AppText>
        <Pressable
          style={[
            styles.inputContainer,
            {
              borderColor: colors[color],
              width: inputWidth,
              paddingHorizontal: PaddingHorizontal,
            },
          ]}
          onPress={() => setVisible(!visible)}>
          <AppText
            fontSize={16}
            fontFamily="Sora-Medium"
            color={selectedItem ? 'primaryContentText' : 'placeholderTextColor'}
            style={styles.inputText}>
            {selectedItem ? selectedItem : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={colors.primary}
          />
        </Pressable>
      </View>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        style={{flex: 0}}>
        <Pressable
          style={{flex: 1}}
          onPress={event => {
            if (event.target == event.currentTarget) {
              setVisible(false);
            }
          }}>
          <View
            style={[
              styles.modal,
              {backgroundColor: colors.secondary, height: modalHeight},
            ]}>
            <FlatList
              data={items}
              style={{flexGrow: 0}}
              scrollEnabled={true}
              contentContainerStyle={{}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setVisible(false);
                    onSelectItem(item);
                  }}
                  style={[
                    styles.gender,
                    {
                      backgroundColor:
                        item === selectedItem
                          ? colors.primary
                          : colors.secondary,
                    },
                  ]}>
                  <AppText fontSize={18} color="white">
                    {item}
                  </AppText>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {},
  label: {
    // fontWeight: Platform.OS === 'android' ? '800' : '700',
  },
  inputContainer: {
    height: height > 700 ? 58 : height / 13,
    borderWidth: 1.5,
    borderRadius: 10,
    // marginBottom: height > 700 ? 15 : 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    // fontWeight: '500',
    flex: 1,
  },
  gender: {
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 10,
  },
});
export default AppPicker;
