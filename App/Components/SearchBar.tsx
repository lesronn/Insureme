import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../Config/colors';

const SearchBar = ({value, onChangeText}: any) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchBarTextInput}
        value={value}
        onChangeText={onChangeText}
        allowFontScaling={false}
        placeholder="Search.."
        placeholderTextColor={colors.placeholderTextColor}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  searchBarTextInput: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 16,
    fontSize: 17,
    fontFamily: 'Sora-Medium',
    backgroundColor: colors.white,
    borderColor: colors.grey,
    color: colors.primaryText,
  },
});
