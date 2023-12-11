import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../Config/colors';
import SubHeader from '../../Components/SubHeader';
import SearchBar from '../../Components/SearchBar';

const GeneralInsurance = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLoader, setSearchLoader] = useState<boolean>(false);

  const handleTextChange = (value: string): void => {
    console.log(value);
    setSearchQuery(value);
    if (value !== '') {
      setSearchLoader(true);
      //   getSearchedNews(`${value}`);
    } else {
      setSearchLoader(false);
    }
  };
  return (
    <>
      <SubHeader
        middleText={true}
        title="General Insurance"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleTextChange} />
      </View>
    </>
  );
};

export default GeneralInsurance;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primaryBg},
});
