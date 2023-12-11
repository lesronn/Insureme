import {StyleSheet, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import AppText from './AppText';
import colors from '../Config/colors';

const CustomSwitch = ({
  selectionMode,

  onSelectSwitch,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  return (
    <View style={styles.tabContainer}>
      <View style={[styles.tabBar, {borderColor: colors.light}]}>
        <Pressable
          onPress={() => updateSwitchData(1)}
          style={[
            styles.switchBtn,
            {
              backgroundColor:
                getSelectionMode === 1 ? colors.primary : colors.white,
            },
          ]}>
          <AppText
            fontSize={18}
            color={getSelectionMode === 1 ? 'primaryBtnText' : 'medium'}
            style={styles.text}
            fontFamily="Sora-Medium">
            Current Plans
          </AppText>
        </Pressable>
        <Pressable
          onPress={() => updateSwitchData(2)}
          style={[
            styles.middleBtn,
            {
              backgroundColor:
                getSelectionMode === 2 ? colors.primary : colors.white,
            },
          ]}>
          <AppText
            fontSize={18}
            color={getSelectionMode === 2 ? 'primaryBtnText' : 'medium'}
            style={styles.text}
            fontFamily="Sora-Medium">
            Declined Plans
          </AppText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 20,
  },
  tabBar: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 55,
  },
  switchBtn: {
    height: '100%',
    flex: 1,
    paddingVertical: 7,
    justifyContent: 'center',
  },
  text: {textAlign: 'center'},
  middleBtn: {
    height: '100%',
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomSwitch;
