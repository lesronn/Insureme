import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import SearchBar from '../../Components/SearchBar';

const VehicleInsuranceScreen = ({navigation}: any) => {
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
        title="Vehicle Insurance"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleTextChange} />
      </View>
    </>
  );
};

export default VehicleInsuranceScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primaryBg},
});
